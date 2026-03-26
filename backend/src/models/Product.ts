import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
 declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;                    // Français

  @Column({ type: DataType.STRING, allowNull: false })
  nameEn!: string;                  // Anglais

  @Column({ type: DataType.TEXT, allowNull: true })
  description!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  descriptionEn!: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  category!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  images!: string[];                // URLs Cloudinary

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isActive!: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}