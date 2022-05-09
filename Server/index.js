import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import login from './Routes/login.js';
import admin from './Routes/admin.js';
import doctor from './Routes/doctor.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(login);
app.use(admin);
app.use(doctor);
 
const CONNECT_URL = "mongodb+srv://juanDbMongo:juan123@cluster0.xh2hw.mongodb.net/ProyIng2?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECT_URL).then(
    app.listen(PORT, () => console.log('RUNNING ON ' + PORT))
    );