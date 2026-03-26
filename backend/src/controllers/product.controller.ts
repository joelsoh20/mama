import { Request, Response } from 'express';
import { Product } from '../models/Product';
import cloudinary from '../config/cloudinary';
import { upload } from '../utils/upload';

export const uploadImages = upload.array('images', 5); // max 5 images

// Helper pour uploader vers Cloudinary
const uploadToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'couture_dor' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    stream.end(file.buffer);
  });
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, nameEn, description, descriptionEn, price, category } = req.body;
    const files = req.files as Express.Multer.File[];

    let imageUrls: string[] = [];
    if (files && files.length > 0) {
      imageUrls = await Promise.all(files.map(file => uploadToCloudinary(file)));
    }

    const product = await Product.create({
      name,
      nameEn,
      description,
      descriptionEn,
      price: parseFloat(price),
      category,
      images: imageUrls,
      isActive: true,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur lors de la création' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    
    const { name, nameEn, description, descriptionEn, price, category, isActive } = req.body;
    const files = req.files as Express.Multer.File[] | undefined;

    let imageUrls = product.images;
    if (files && files.length > 0) {
      const newUrls = await Promise.all(files.map(file => uploadToCloudinary(file)));
      imageUrls = [...imageUrls, ...newUrls];
    }

    await product.update({
      name,
      nameEn,
      description,
      descriptionEn,
      price: parseFloat(price),
      category,
      images: imageUrls,
      isActive: isActive !== undefined ? isActive : product.isActive,
    });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    await product.destroy();
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};