import express from "express";
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js";
import saleRoutes from "./routes/sale.js";
import dealRoutes from "./routes/deal.js";
import profileRoutes from "./routes/profile.js";
import contactRoutes from "./routes/contact.js";
import newsRoutes from "./routes/news.js";
import dotenv from "dotenv";
import path from "path"
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import {userData, saleData} from "./dummy_data/data.js"
import User from './Model/User.js'
import Sale from './Model/Sale.js'
import hubspot from "@hubspot/api-client";
import cors from 'cors';
// import app from 'express'

// const cors = require('cors');


const app = express();
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


const hubspotClient = new hubspot.Client({
    accessToken: 'pat-eu1-e3336767-6091-44af-99be-8941f27a2673',
    numberOfApiCallRetries: 3,
});
        

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);
dotenv.config();

app.use(express.json());

app.use(bodyParser.json());
// Configure body-parser and Multer for handling form data and file uploads
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer({ dest: 'uploads/' }).single('profilePicture'));

/* Routes */
app.use("/auth", authRoutes);
app.use('/sales', saleRoutes);
app.use('/profile',profileRoutes);
app.use('/deals',dealRoutes);
app.use('/contacts',contactRoutes);
app.use('/news', newsRoutes);

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

export default hubspotClient;