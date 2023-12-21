import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
import { createSaleNote, getAll, 
    getSaleNoteById, getSaleNoteBySaleId} from '../Controller/sale_note.js';

router.post('/createSaleNote', verifyToken, createSaleNote);
router.get('/getAll', verifyToken, getAll);
router.get('/getSaleNoteById/:id', verifyToken, getSaleNoteById);
router.get('/getSaleNoteBySaleId/:id', verifyToken, getSaleNoteBySaleId);

export default router;
