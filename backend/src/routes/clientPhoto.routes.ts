import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import {
  getAllClientPhotos,
  createClientPhoto,
  deleteClientPhoto,
  uploadClientPhoto
} from '../controllers/clientPhoto.controller';

const router = Router();

// Public : affichées dans la section "Clients Satisfaits" du site
router.get('/', getAllClientPhotos);

// Admin uniquement
router.post('/', authenticateToken, uploadClientPhoto, createClientPhoto);
router.delete('/:id', authenticateToken, deleteClientPhoto);

export default router;
