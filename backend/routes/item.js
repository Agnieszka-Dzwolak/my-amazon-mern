import express from 'express';
import itemController from '../controllers/item.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const { getUserItems, createItem, updateItem, deleteItem } = itemController;

// routes
router.get('/items/user/:id', verifyToken, getUserItems);
router.post('/items', verifyToken, createItem);
router.put('/items/:id', verifyToken, updateItem);
router.delete('/items/:id', verifyToken, deleteItem);

export default router;
