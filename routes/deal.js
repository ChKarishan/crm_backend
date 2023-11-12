import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
import {getAllDealsFromHubspot, getDeal, createDeal, AssociateDealWithUser, updateDeal} from '../Controller/deal.js';

router.get('/getAllDealsFromHubspot', verifyToken, getAllDealsFromHubspot); //yestomonday
router.get('/getDeal/:id', verifyToken, getDeal);
router.post('/createDeal', verifyToken, createDeal);  //yestomonday
router.post('/AssociateDealWithContact', verifyToken, AssociateDealWithUser); //remaining
router.put('/updateDeal/:dealId', verifyToken, updateDeal);

export default router;