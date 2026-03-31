import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; // <--- AJOUTE ÇA IMPÉRATIVEMENT ICI

// On récupère le secret SANS valeur par défaut codée en dur
const JWT_SECRET = '7f8e9a2b4c5d6e1f0a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Accès refusé. Token manquant.' });
  }

  // Sécurité : si le secret est vide dans le .env, on bloque tout
  if (!JWT_SECRET) {
    console.error("ERREUR CRITIQUE : JWT_SECRET n'est pas défini dans le .env");
    return res.status(500).json({ message: "Erreur de configuration serveur." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.log("Échec de vérification du token");
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};