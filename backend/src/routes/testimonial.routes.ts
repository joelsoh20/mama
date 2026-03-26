import { Router } from 'express';
import { protectAdmin } from '../middlewares/auth.middleware';
import {
  getApprovedTestimonials,
  getAllTestimonials,
  createTestimonial,
  approveTestimonial,
  deleteTestimonial,
} from '../controllers/testimonial.controller';

const router = Router();

// Publique
router.get('/approved', getApprovedTestimonials);

// Admin seulement
router.get('/', protectAdmin, getAllTestimonials);
router.post('/', createTestimonial);                    // Client peut poster (optionnel)
router.put('/:id/approve', protectAdmin, approveTestimonial);
router.delete('/:id', protectAdmin, deleteTestimonial);

export default router;