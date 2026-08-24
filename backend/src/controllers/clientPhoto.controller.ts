import { Request, Response } from 'express';
import { ClientPhoto } from '../models/ClientPhoto';
import cloudinary from '../config/cloudinary';
import { upload } from '../utils/upload';

export const uploadClientPhoto = upload.single('image');

export const getAllClientPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await ClientPhoto.findAll({ order: [['createdAt', 'DESC']] });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération' });
  }
};

export const createClientPhoto = async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
      return res.status(400).json({ message: 'Une image est requise.' });
    }

    const { caption } = req.body;

    const imageUrl = await new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'SOH_CHANTAL_CLIENTS' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!.secure_url);
        }
      );
      stream.end(file.buffer);
    });

    const photo = await ClientPhoto.create({ imageUrl, caption } as any);
    res.status(201).json(photo);
  } catch (error: any) {
    console.error("Erreur création photo cliente:", error);
    res.status(500).json({ message: error.message || 'Erreur lors de la création' });
  }
};

export const deleteClientPhoto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const photo = await ClientPhoto.findByPk(id);
    if (!photo) return res.status(404).json({ message: 'Photo non trouvée' });

    await photo.destroy();
    res.json({ message: 'Photo supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};
