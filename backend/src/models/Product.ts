import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

// Liste des catégories valides pour SOH & CHANTAL
export const PRODUCT_CATEGORIES = [
  'Boubou', 
  'Pantalon', 
  'Robe de soirée', 
  'Gandoura', 
  'Kaba', 
  'Ensemble Pagne', 
  'Enfants', 
  'Mariage', 
  'Sur Mesure'
];

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare descriptionEn: string;

  // La colonne price a été retirée

  @Column({ 
    type: DataType.STRING, 
    allowNull: false,
    validate: {
      // Sécurité : empêche d'ajouter une catégorie non prévue
      isIn: [PRODUCT_CATEGORIES] 
    }
  })
  declare category: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  declare images: string[];

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}