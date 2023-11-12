import express from 'express';
const router = express.Router();
import { verifyToken } from '../Middleware/auth.js';
import { getAllContactsFromHubspot, getContact, IdFromEmail,
     createContact, updateContact} from '../Controller/contact.js'
//import function from controller


router.get('/getAllContactsFromHubspot', verifyToken, getAllContactsFromHubspot);
router.get('/getContact/:contactId', verifyToken, getContact);
router.post('/createContact', verifyToken, createContact);
router.put('/updateContact/:contactId', verifyToken, updateContact); //remaining
router.get('IdFromEmail', verifyToken, IdFromEmail);

export default router;