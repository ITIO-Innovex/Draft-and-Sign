import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors'
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: "*"
}));
connectDB();
app.use(express.json());
app.use('/', authRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Auth running on http://localhost:${PORT}/`));
