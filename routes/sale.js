import express from 'express';
const router = express.Router();
import { getSales, createSale, dailyAverageSale, saleWithMostPannels, saleWithMostWattage,
    getSale, updateSale, deleteSale, annualSale, largestSale} from '../Controller/sale.js';
import { verifyToken } from '../Middleware/auth.js';

router.get('/saleWithMostPannels', verifyToken, saleWithMostPannels);
router.get('/saleWithMostWattage', verifyToken, saleWithMostWattage);
router.get('/getSales', verifyToken, getSales);
router.get('/annualSale', verifyToken, annualSale);
router.get('/largestSale', verifyToken, largestSale);
router.get('/dailyAverageSale', verifyToken, dailyAverageSale);
router.post('/createSale', verifyToken, createSale);
router.get('/:id', verifyToken, getSale);
router.put('/:id', verifyToken, updateSale);
router.delete('/:id', verifyToken, deleteSale);
export default router;
