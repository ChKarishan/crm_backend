import express from 'express';
const router = express.Router();
import { getSales, createSale, dailyAverageSale,
    getSale, updateSale, deleteSale, annualSale, largestSale} from '../Controller/sale.js';
import { verifyToken } from '../Middleware/auth.js';

router.get('/getSales', verifyToken, getSales);
router.get('/annualSale', verifyToken, annualSale);
router.get('/largestSale', verifyToken, largestSale);
router.get('/dailyAverageSale', verifyToken, dailyAverageSale);
router.post('/createSale', verifyToken, createSale);
router.get('/:id', verifyToken, getSale);
router.put('/:id', verifyToken, updateSale);
router.delete('/:id', verifyToken, deleteSale);
export default router;
