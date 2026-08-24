import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { AdminUser } from '../models/AdminUser';

const JWT_SECRET = process.env.JWT_SECRET as string;
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    if (!JWT_SECRET) {
      console.error("ERREUR CRITIQUE : JWT_SECRET n'est pas défini dans le .env");
      return res.status(500).json({ success: false, message: 'Erreur de configuration serveur.' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Nom d'utilisateur et mot de passe sont obligatoires"
      });
    }

    const admin = await AdminUser.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Nom d'utilisateur ou mot de passe incorrect"
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Nom d'utilisateur ou mot de passe incorrect"
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        role: admin.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Connexion réussie',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        role: admin.role,
      }
    });

  }  catch (error: any) {
  console.log("----- ERREUR LOGIN -----");
  console.error(error); // C'est CA qui va nous donner la solution
  console.log("-------------------------");
  res.status(500).json({ success: false, message: error.message });
}
};

// export const updatePassword = async (req: Request, res: Response) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     const adminId = (req as any).user.id; // Récupéré via ton middleware d'authentification

//     const admin = await AdminUser.findByPk(adminId);
//     if (!admin) return res.status(404).json({ message: "Admin non trouvé" });

//     // 1. Vérifier si l'ancien mot de passe est correct
//     const isMatch = await bcrypt.compare(oldPassword, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "L'ancien mot de passe est incorrect" });
//     }

//     // 2. Hasher le nouveau mot de passe
//     const salt = await bcrypt.genSalt(10);
//     admin.password = await bcrypt.hash(newPassword, salt);
    
//     await admin.save();

//     res.json({ success: true, message: "Mot de passe mis à jour avec succès" });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de la mise à jour" });
//   }
// };

// Mettre à jour les informations de base (Nom, Email)
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.id; // Récupéré via le middleware authenticateToken
    const { name, email } = req.body;

    const admin = await AdminUser.findByPk(adminId);
    if (!admin) return res.status(404).json({ message: "Admin non trouvé" });

    await admin.update({ name, email });
    res.json({ message: "Profil mis à jour avec succès", admin: { name, email } });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour" });
  }
};

// Changer le mot de passe en toute sécurité
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const adminId = (req as any).user.id;
    const { oldPassword, newPassword } = req.body;

    const admin = await AdminUser.findByPk(adminId);
    if (!admin) return res.status(404).json({ message: "Admin non trouvé" });

    // 1. Vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(401).json({ message: "L'ancien mot de passe est incorrect" });

    // 2. Mettre à jour (le BeforeCreate s'occupera du hash automatiquement)
    admin.password = newPassword;
    await admin.save();

    res.json({ message: "Mot de passe modifié avec succès ! ✅" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du changement de mot de passe" });
  }
};

