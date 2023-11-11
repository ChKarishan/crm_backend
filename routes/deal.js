import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
//import function from controller

router.get('/getAllDealsFromHubspot', verifyToken, getDeals);
router.get('/getDeal/:id', verifyToken, getDeal);
router.post('/createDeal', verifyToken, createDeal);
router.post('/AssociateDealWithUser', verifyToken, AssociateDealWithUser); //remaining
router.put('/updateDeal/:dealId', verifyToken, updateDeal);

export default router;