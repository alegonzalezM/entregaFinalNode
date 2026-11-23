import express from 'express'
import { getAllProducts, getProductsById, createProduct, deleteProduct } from '../controllers/productController.js';

const router= express.Router();

router.get('/api/products', getAllProducts);

router.get('/api/products/:id', getProductsById);

router.post('/api/products/create', createProduct);

router.delete('/api/products/:id',  deleteProduct);

export default router;