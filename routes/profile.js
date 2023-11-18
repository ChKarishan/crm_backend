import express from 'express';
const router = express.Router();
import {
    changePassword,
    updateUserName,
    updateProfilePicture,
    getProfilePicture,
    saveReferralCode,
    genealogy,
    getParent,
    getChildren,
    getRefferalCode,
    mostReferral
} from '../Controller/profile.js';
import { verifyToken } from '../Middleware/auth.js';
import multer from "multer";


// Set up multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage: storage });


router.put("/changePassword", verifyToken, changePassword);
router.put("/updateUserName",verifyToken, updateUserName);
router.put("/updateProfilePicture", verifyToken, updateProfilePicture);
router.get("/getProfilePicture", verifyToken, getProfilePicture);
router.post("/saveReferralCode", verifyToken, saveReferralCode);
router.get("/genealogy", verifyToken, genealogy);
router.get('/getParent', verifyToken, getParent);
router.get('/getChildren', verifyToken, getChildren);
router.get('/getRefferalCode', verifyToken, getRefferalCode);
router.get('/mostReferral', verifyToken, mostReferral);
// router.put("/updateProfilePicture", [verifyToken, upload.single('profilePicture')], updateProfilePicture);

export default router;
