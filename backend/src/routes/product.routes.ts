import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImages // <--- AJOUTÉ ICI pour que la ligne 22 fonctionne
} from '../controllers/product.controller';

const router = Router();

// --- Routes Publiques (Accessibles par les clientes) ---
// Récupérer tous les modèles du catalogue
router.get('/', getAllProducts); 

// --- Routes Privées (Réservées à l'Admin Flore) ---
// Ajouter une nouvelle création avec ses images
// L'ordre est : 1. Qui es-tu ? 2. Reçois les photos 3. Enregistre tout
router.post('/', authenticateToken, uploadImages, createProduct);

// Modifier une création existante
router.put('/:id', authenticateToken, uploadImages, updateProduct);

// Supprimer un modèle du catalogue
router.delete('/:id', authenticateToken, deleteProduct);

export default router;