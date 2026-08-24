import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

// Supabase (comme la plupart des Postgres managés) exige une connexion SSL.
// DB_SSL peut être mis à 'false' pour désactiver (ex: Postgres local).
// DB_SSL_REJECT_UNAUTHORIZED peut être mis à 'false' uniquement si la
// vérification du certificat échoue (ex: ancienne version de Node.js).
const useSSL = process.env.DB_SSL !== 'false';
const dialectOptions = useSSL
  ? { ssl: { require: true, rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false' } }
  : {};

const commonOptions = {
  dialect: 'postgres' as const,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  models: [__dirname + '/../models'], // Charge tous les modèles automatiquement
  dialectOptions,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

// DATABASE_URL (fournie par Supabase : Project Settings > Database > Connection string)
// prend le pas sur les variables DB_* si elle est définie.
export const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, commonOptions)
  : new Sequelize({
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      ...commonOptions,
    });

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connecté avec succès !');
    
    // Synchronisation (à désactiver en production après les migrations)
    await sequelize.sync({ alter: true }); // alter: true = met à jour les tables sans tout supprimer
    console.log('✅ Base de données synchronisée');
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};