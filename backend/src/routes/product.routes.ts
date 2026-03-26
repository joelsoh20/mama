import { Router } from 'express';
import { protectAdmin } from '../middlewares/auth.middleware';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImages,
} from '../controllers/product.controller';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getAllProducts); // temporaire

router.post('/', protectAdmin, uploadImages, createProduct);
router.put('/:id', protectAdmin, uploadImages, updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

export default router;