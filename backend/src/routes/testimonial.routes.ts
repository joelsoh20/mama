import { Router } from 'express';
import { Testimonial } from '../models/Testimonial';
import { authenticateToken}  from '../middlewares/auth.middleware'; // Ton middleware JWT

const router = Router();

// --- ROUTES PUBLIQUES ---

// 1. Envoyer un nouveau témoignage (Statut 'pending' par défaut)
router.post('/', async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const testimonial = await Testimonial.create({ name, comment, rating });
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'envoi" });
  }
});

// 2. Récupérer uniquement les témoignages APPROUVÉS (Pour la page d'accueil)
router.get('/approved', async (req, res) => {
  try {
    const approved = await Testimonial.findAll({
      where: { isApproved: true },
      order: [['createdAt', 'DESC']]
    });
    res.json(approved);
  } catch (error) {
    res.status(500).json({ error: "Erreur de récupération" });
  }
});

// --- ROUTES ADMIN (Protégées) ---

// 3. Récupérer TOUS les témoignages (Pour ton AdminTestimonials.tsx)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const all = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
    res.json(all);
  } catch (error) {
    res.status(500).json({ error: "Accès refusé" });
  }
});

// 4. Approuver un témoignage
router.patch('/approve/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.update({ isApproved: true }, { where: { id } });
    res.json({ message: "Témoignage approuvé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'approbation" });
  }
});

// 5. Supprimer un témoignage
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.destroy({ where: { id } });
    res.json({ message: "Témoignage supprimé" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression" });
  }
});

export default router;