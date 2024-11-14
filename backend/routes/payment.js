import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import paymentController from '../controllers/payment.js';

const router = express.Router();

const { makePayment } = paymentController;

// routes
router.post('/payment', verifyToken, makePayment);

export default router;
