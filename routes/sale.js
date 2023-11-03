import express from 'express';
const router = express.Router();
import { getSales, createSale, getSale, updateSale, deleteSale } from '../Controller/sale.js';
import { verifyToken } from '../Middleware/auth.js';

router.get('/', verifyToken, getSales);
router.post('/', verifyToken, createSale);
router.get('/:id', verifyToken, getSale);
router.put('/:id', verifyToken, updateSale);
router.delete('/:id', verifyToken, deleteSale);

export default router;
