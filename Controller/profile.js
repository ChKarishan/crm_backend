import express from "express";
const router = express.Router();
import User from "../Model/User.js";
import bcrypt from "bcrypt";
import path from "path";
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import axios from "axios";

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

/////////for saving referral code////////
export async function saveReferralCode(req, res){
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
    const referralCode = shortid.generate();
    const user = await User.findById(userId);
    user.referralCode = referralCode;
    console.log(user);
    await user.save();
    res.json(user.referralCode);
      // geneUser.findByoneAndUpdate
      // Update the user with the generated referral code
    // const user = await User.findOneAndUpdate(userId, { referralCode }, { new: true });
  
      // res.json({ success: true, referralCode: user.referralCode });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

/////////////getting genalogy/////
export async function genealogy(req, res){
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify and decode the JWT token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    console.log(id);

    // Find the user by ID
    const user = await User.findById(id).populate('parent').populate('children');

    console.log(user);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Extract relevant information for response
    const genealogyInfo = {
      user: {
        _id: user._id,
        name: user.name,
        referralCode: user.referralCode,
      },
      parent: user.parent ? { _id: user.parent._id, name: user.parent.name } : null,
      children: user.children.map((child) => ({ _id: child._id, name: child.name, referralCode: child.referralCode })),
    };

    res.json({ success: true, genealogy: genealogyInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


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


export async function getParent(req,res){
  try{

    const token = req.headers['authorization'];
    console.log(token)
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify and decode the JWT token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const userId = decoded.id;

  }catch(error){

  }
}

export async function getChildren(req,res){

  try{

  }catch(error){
    
  }
}

export async function getRefferalCode(req,res){

  try{

  }catch(error){
    
  }
}

export async function mostReferral(req,res){

  try{

  }catch(error){
    
  }
}