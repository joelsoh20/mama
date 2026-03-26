import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'testimonials', timestamps: true })
export class Testimonial extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar?: string;           // URL Cloudinary (optionnel)

  @Column({ type: DataType.TEXT, allowNull: false })
  message!: string;

  @Column({ type: DataType.INTEGER, defaultValue: 5 })
  rating!: number;           // 1 à 5 étoiles

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isApproved!: boolean;      // Pour valider avant publication
}