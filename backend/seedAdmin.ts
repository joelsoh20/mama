import { AdminUser } from './src/models/AdminUser';
import { sequelize } from './src/config/database';

const resetAdmin = async () => {
  try {
    // 1. Connexion forcée
    await sequelize.authenticate();
    sequelize.addModels([AdminUser]);
    
    // 2. SUPPRESSION TOTALE de l'ancien admin pour nettoyer la base
    await AdminUser.destroy({ where: { email: 'makuneflore@gmail.com' } });
    console.log("🗑️ Ancien admin supprimé.");

    // 3. CRÉATION TOUTE NEUVE
    // On passe le mot de passe en CLAIR, le modèle le hash grâce à @BeforeCreate
    await AdminUser.create({
      name: 'Flore Makune',
      email: 'makuneflore@gmail.com',
      password: 'admin123', 
      role: 'super_admin'
    });

    console.log("✅ NOUVEL ADMIN CRÉÉ AVEC SUCCÈS !");
    console.log("Identifiants : makuneflore@gmail.com / admin123");

  } catch (error) {
    console.error("❌ Erreur lors du reset :", error);
  } finally {
    process.exit();
  }
};

resetAdmin();