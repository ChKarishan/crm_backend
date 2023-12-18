import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
import {createInstaller, getAll, 
    getInstaller, updateInstaller, 
    getListInstaller} from '../Controller/installer.js';

router.post('/createInstaller', verifyToken, createInstaller);
router.get('/getAll', verifyToken, getAll);
router.get('/getInstaller/:id', verifyToken, getInstaller);
router.post('/getListInstaller', verifyToken, getListInstaller);
router.put('/updateInstaller/:id', verifyToken, updateInstaller);

export default router;