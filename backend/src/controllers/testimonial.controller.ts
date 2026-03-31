import { Request, Response } from 'express';
import { Testimonial } from '../models/Testimonial';

// 1. Récupérer uniquement les témoignages validés (Côté Client)
export const getApprovedTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { isApproved: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 2. Récupérer tous les témoignages (Côté Admin)
export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// 3. Créer un témoignage (Public)
export const createTestimonial = async (req: Request, res: Response) => {
  try {
    // Correction : On récupère 'comment' (envoyé par le front) 
    // mais on l'enregistre dans 'message' (ton modèle Sequelize actuel)
    const { name, comment, message, rating, avatar } = req.body;
    
    const testimonial = await Testimonial.create({
      name,
      message: message || comment, // Supporte les deux noms au cas où
      rating: rating ? Number(rating) : 5,
      avatar,
      isApproved: false, 
    });
    res.status(201).json(testimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création' });
  }
};

// 4. Approuver un témoignage (Admin)
export const approveTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const testimonial = await Testimonial.findByPk(id);
    
    if (!testimonial) return res.status(404).json({ message: 'Témoignage non trouvé' });

    await testimonial.update({ isApproved: true });
    res.json({ message: 'Témoignage approuvé avec succès', testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l’approbation' });
  }
};

// 5. Supprimer un témoignage (Admin)
export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    
    if (!testimonial) return res.status(404).json({ message: 'Témoignage non trouvé' });

    await testimonial.destroy();
    res.json({ message: 'Témoignage supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression' });
  }
};