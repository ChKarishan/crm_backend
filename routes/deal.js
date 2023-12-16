import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
import {getAllDealsFromHubspot, getDeal, createDeal, 
    AssociateDealWithContact, updateDeal,
    dealsThisYear} from '../Controller/deal.js';

router.get('/getAllDealsFromHubspot', verifyToken, getAllDealsFromHubspot); //yestomonday
router.get('/getDeal/:id', verifyToken, getDeal);
router.post('/createDeal', verifyToken, createDeal);  //yestomonday
router.post('/AssociateDealWithContact', verifyToken, AssociateDealWithContact); //remaining
router.put('/updateDeal/:dealId', verifyToken, updateDeal);
router.get('/dealsThisYear', verifyToken, dealsThisYear);

export default router;