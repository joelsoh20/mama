import { Router } from 'express';
import { loginAdmin, updatePassword, updateProfile } from '../controllers/auth.controller'; 
import { deleteProduct, updateProduct, createProduct, getAllProducts } from '../controllers/product.controller';
import { upload } from '../utils/upload';
import { authenticateToken } from '../middlewares/auth.middleware'; // <--- AJOUT IMPORTANT

const router = Router();

// --- ROUTES AUTHENTIFICATION ---
router.post('/login', loginAdmin);
router.put('/update-password', authenticateToken, updatePassword);
router.put('/update-profile', authenticateToken, updateProfile);

// --- ROUTES CATALOGUE (PRODUITS) ---
const uploadImages = upload.array('images', 5);

// Tout le monde peut voir les créations
router.get('/', getAllProducts);

// SEULE FLORE (avec le token) peut ajouter, modifier ou supprimer
// L'ordre est CRUCIAL : 1. Sécurité (Token) -> 2. Images (Multer) -> 3. Action (Contrôleur)
router.post('/', authenticateToken, uploadImages, createProduct); 
router.put('/:id', authenticateToken, uploadImages, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

export default router;