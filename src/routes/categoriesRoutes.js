import express from 'express';
import { getAllCategories, getCategoryById, createCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);   

export default router;   