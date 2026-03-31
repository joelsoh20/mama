import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { connectDB } from './config/database';

// Imports des routes
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import testimonialRoutes from './routes/testimonial.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. MIDDLEWARES DE BASE ---
app.use(helmet());

// CONFIGURATION CORS MISE À JOUR
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  // Ajout de 'PATCH' ici pour permettre l'approbation des témoignages
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); 
app.use(morgan('dev'));

// --- 2. ROUTE CONTACT & EMAIL ---
app.post('/api/contact', async (req, res) => {
  console.log("--- REQUETE CONTACT REÇUE ---");
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Champs manquants" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false 
      }
    });

    const htmlContent = `
      <div style="font-family: sans-serif; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
        <h2 style="color: #003366;">Nouveau Message - SOH & CHANTAL</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="background: #f4f4f4; padding: 15px;">${message}</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 Nouveau message de ${name}`,
      html: htmlContent,
    });

    res.status(200).json({ success: true, message: 'Email envoyé !' });
  } catch (error: any) {
    console.error("❌ ERREUR NODEMAILER :", error.message);
    res.status(500).json({ success: false, details: error.message });
  }
});

// --- 3. BRANCHEMENT DES AUTRES ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/testimonials', testimonialRoutes);

// --- 4. ROUTES DE TEST ---
app.get('/', (req, res) => {
  res.json({ message: 'Atelier SOH & CHANTAL - API opérationnelle ✅' });
});

// --- 5. LANCEMENT ---
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`
      🚀 SOH & CHANTAL BACKEND
      📍 URL: http://localhost:${PORT}
      🛠️  Database: PostgreSQL / Sequelize Connecté
      `);
    });
  } catch (error) {
    console.error('❌ Erreur de démarrage:', error);
    process.exit(1);
  }
};

startServer();