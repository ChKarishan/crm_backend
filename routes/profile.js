import express from 'express';
const router = express.Router();
import {
    changePassword,
    updateUserName,
    updateProfilePicture
} from '../Controller/profile.js';
import { verifyToken } from '../Middleware/auth.js';


router.put("/changePassword", verifyToken, changePassword);
router.put("/updateUserName",verifyToken, updateUserName);
router.post("/updateProfilePicture", verifyToken, updateProfilePicture);

export default router;
