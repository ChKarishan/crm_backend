import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
import { createDealNote, getAll, 
    getDealNoteById, getDealNoteByDealId} from '../Controller/deal_note.js';

router.post('/createDealNote', verifyToken, createDealNote);
router.get('/getAll', verifyToken, getAll);
router.get('/getDealNoteById/:id', verifyToken, getDealNoteById);
router.get('/getDealNoteByDealId/:id', verifyToken, getDealNoteByDealId);

export default router;