import express from "express";
const router = express.Router();
import User from "../Model/User.js";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";

import {verifyToken} from "../Middleware/auth.js"; // Import the JWT middleware

// Registration
export const register = async (req, res) => {
  try {

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
    });
    await user.save();
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
      // If the email and password are valid, you can generate a JWT token here
      // and send it back to the client
      // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: '1h', // Token expiration time
      // });
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      res.json({ message: 'Authentication successful', token });


    } catch (error) {

      res.status(500).json({ error: 'Login failed' });

    }
  };

export default router;
