import express from "express";
const router = express.Router();
import User from "../Model/User.js";
import bcrypt from "bcrypt";
import path from "path";
import jwt from 'jsonwebtoken';
import axios from "axios";
// import {v2 as cloudinary} from 'cloudinary';

// cloudinary.config({ 
//     cloud_name: 'dmlmiktus', 
//     api_key: '777783275156829', 
//     api_secret: 'aL8yg2Pw9cTo_69wvFCFhvlZuEg' 
//   });

export async function updateUserName(req, res) {
    try {

    const token = req.headers['authorization'];
    console.log(token)
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify and decode the JWT token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const userId = decoded.id;
    console.log(userId)
    const newUsername = req.body.username;
    console.log(newUsername)
    // Update the user's username in the database
    const updatedUser = await User.findByIdAndUpdate(userId, { username: newUsername }, { new: true });
    console.log(updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);

    } catch (error) {

    res.status(500).json({ error: 'Username update failed' });

    }
}

export async function getProfilePicture(req,res){
    try {

    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify and decode the JWT token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const profilePicturePath = user.profilePicture;
    // Serve the user's profile picture as a file
    if (profilePicturePath) {
        const response = await axios.get(profilePicturePath, { responseType: 'arraybuffer' });
        // Set the appropriate headers for an image response
        res.set('Content-Type', 'image/jpeg');
        res.send(response.data);
    } else {
      return res.status(404).json({ error: 'Profile picture not found' });
    }

    } catch (error) {
    
        res.status(500).json({ error: 'Failed to retrieve profile picture' });
      
    }
}

export async function updateProfilePicture(req,res){
    try {

    console.log("in updateProfilePicture")
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify and decode the JWT token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decoded.id;
    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(req.body);
    user.profilePicture = req.body.profilePicture;
    await user.save();
    res.status(200).json({ message: 'Profile picture updated successfully' });

    // // Update the user's profile picture path in the database
    // if (req.file) {
    //     // Upload the image to Cloudinary
    //     console.log(req.file);
    //     const result = await cloudinary.uploader.upload(req.file);
    //     console.log("result");
    //     console.log(result);
    //     user.profilePicture = result.secure_url ;
    //     await user.save();
    //     res.status(200).json({ message: 'Profile picture updated successfully' });
    // } else {
    //   return res.status(400).json({ error: 'Invalid file format or missing profile picture' });
    // }

    } catch (error) {

    res.status(500).json({ error: 'Failed to update profile picture' });
      
    }
}

export async function changePassword(req,res){
    try {

    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify and decode the JWT token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { currentPassword, newPassword } = req.body;
    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password changed successfully' });

  } catch (error) {

    res.status(500).json({ error: 'Failed to change password' });

  }

}

