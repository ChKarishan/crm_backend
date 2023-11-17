import express from "express";
const router = express.Router();
import User from "../Model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import shortid from 'shortid';

import {verifyToken} from "../Middleware/auth.js"; // Import the JWT middleware

// Registration
export const register = async (req, res) => {
  try {

    const { email, username, password, profilePicture, referralCode} = req.body;
    // console.log(req.body);

    let referredBy = null;
    if (referralCode) {
      referredBy = await User.findOne({ referralCode });
      // console.log(referredBy)
      if(referredBy){
        console.log("hi");
       const parent = referredBy._id; //shortid.generate();
       console.log(parent);
      }
      else{
          res.status(500).json({ success: false, message: 'wrong referral code' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      username: username,
      password: hashedPassword,
      referralCode: shortid.generate(),
      parent: referredBy._id,
      profilePicture: profilePicture
    });
    console.log(user);
    await user.save();

    if (referredBy) {
      referredBy.children.push(user);
      await referredBy.save();
    }
    res.status(201).json({ message: 'User registered successfully' });


  } catch (error) {

    res.status(500).json({ error: 'Registration failed' });

  }
};

//login
export const login = async (req, res) => {
    try{

    const { email, password } = req.body;
        // Find the user by their email (assumes unique email addresses)
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
      
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

      res.cookie('token', token);
      return res.json({ status: 'success', token , first_name : "bilal"});


    } catch (error) {

      return res.status(500).json({ error: 'Login failed' });

    }
  };

export default router;
