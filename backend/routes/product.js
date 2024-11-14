import express from 'express';
import productController from '../controllers/product.js';
import checkUser from '../middleware/checkUser.js';

const router = express.Router();

const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = productController;

// routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProduct);
router.post('/products', checkUser, createProduct);
router.put('/products/:id', checkUser, updateProduct);
router.delete('/products/:id', checkUser, deleteProduct);

export default router;
