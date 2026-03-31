import { Request, Response } from 'express';
import { Product } from '../models/Product';
import cloudinary from '../config/cloudinary';
import { upload } from '../utils/upload'; // Ton utilitaire Multer

// --- 1. EXPORT DU MIDDLEWARE POUR LES ROUTES ---
export const uploadImages = upload.array('images', 5);

/**
 * Helper pour envoyer les photos vers Cloudinary
 */
const uploadToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'SOH_CHANTAL_CATALOGUE' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

// --- 2. ACTIONS DU CONTRÔLEUR ---

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // Retrait de 'price' de la déstructuration
    const { description, descriptionEn, category } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Au moins une image est requise." });
    }

    const imageUrls = await Promise.all(files.map(file => uploadToCloudinary(file)));

    // Création sans le champ price
    const product = await Product.create({
      description,
      descriptionEn,
      category,
      images: imageUrls,
      isActive: true,
    } as any);

    res.status(201).json(product);
  } catch (error: any) {
    console.error("Erreur création:", error);
    res.status(500).json({ message: error.message || 'Erreur lors de la création' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    // Retrait de 'price' ici également
    const { description, descriptionEn, category, isActive } = req.body;
    const files = req.files as Express.Multer.File[] | undefined;

    let imageUrls = product.images || [];

    if (files && files.length > 0) {
      const newUrls = await Promise.all(files.map(file => uploadToCloudinary(file)));
      imageUrls = [...imageUrls, ...newUrls];
    }

    // Mise à jour sans le champ price
    await product.update({
      description,
      descriptionEn,
      category,
      images: imageUrls,
      isActive: isActive !== undefined ? (isActive === 'true' || isActive === true) : product.isActive,
    } as any);

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    await product.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};