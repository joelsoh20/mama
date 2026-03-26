import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/product.routes';
import { connectDB } from './config/database';
import productRoutes from './routes/product.routes';
import testimonialRoutes from './routes/testimonial.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Couture d’Or - Backend Sequelize OK ✅' });
});

// Routes (on les ajoutera progressivement)

app.use('/api/products', require('./routes/product.routes').default);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/testimonials', testimonialRoutes);



// Lancement
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
  });
};

startServer();