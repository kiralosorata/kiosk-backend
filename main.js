import dotenv from 'dotenv';
dotenv.config();          // 1️⃣ load .env first

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import triageRoutes from './routes/triageRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// middleware --------------------------------------------------
app.use(cors());
app.use(express.json());            // ⬅ modern replacement for bodyParser.json()

// static files (dashboard, css, images…) ----------------------
app.use(express.static(path.join(__dirname, 'public')));

// REST API ----------------------------------------------------
app.use('/api', triageRoutes);

// pretty URL for the dashboard -------------------------------
app.get('/admin', (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'admin.html'))
);

// start server -----------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚑  Triage backend running on ${PORT}`));
