import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ 
  tableName: 'testimonials',
  timestamps: true // Active createdAt et updatedAt pour trier par date
})
export class Testimonial extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare comment: string; // Renommé pour correspondre au Frontend

  @Column({ 
    type: DataType.INTEGER, 
    defaultValue: 5,
    validate: { min: 1, max: 5 } 
  })
  declare rating: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isApproved: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  declare avatar: string;
}