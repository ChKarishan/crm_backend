import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
// import functions from controller

router.post('/createNews', verifyToken,createNews);
router.get('/getAllNews', verifyToken, getAllNews);
router.get('/getNewsDaily', verifyToken, getNewsDaily);
router.get('/getNewsMonthly', verifyToken, getNewsMonthly);
router.get('/getNewsYearly', verifyToken, getNewsYearly);
router.put('/updateNews/:id', verifyToken, updateNews);