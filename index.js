import express from "express";
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js";
import saleRoutes from "./routes/sale.js";
import dealRoutes from "./routes/deal.js";
import profileRoutes from "./routes/profile.js";
import contactRoutes from "./routes/contact.js";
import newsRoutes from "./routes/news.js";
import installerRoutes from "./routes/installer.js";
import saleNoteRoutes from "./routes/sale_note.js";
import dealNoteRoutes from "./routes/deal_note.js"; 
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
    origin:'https://crm-frontend-master-hazel.vercel.app', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


const hubspotClient = new hubspot.Client({
    accessToken: process.env.AccessToken,
    numberOfApiCallRetries: 3,
});
        

const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(__filename);
dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello world");
})

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
app.use('/installer', installerRoutes);
app.use('/saleNotes', saleNoteRoutes);
app.use('/dealNotes', dealNoteRoutes);


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