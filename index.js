import express from "express";
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js";
import saleRoutes from "./routes/sale.js";
import profileRoutes from "./routes/profile.js";
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import multer from "multer";
import {userData, saleData} from "./dummy_data/data.js"
import User from './Model/User.js'
import Sale from './Model/Sale.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());

// Configure body-parser and Multer for handling form data and file uploads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: 'uploads/' }).single('profilePicture'));

/* Routes */
app.use("/auth", authRoutes);
app.use('/sales', saleRoutes);
app.use('/profile',profileRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    console.log("mongo db connected")

    /* Add data one time  (don't uncomment below code) */
    // User.insertMany(userData);
    // Sale.insertMany(saleData);

}).catch((error) => console.log(`${error} did not conenct`));