import { Table, Column, Model, DataType, Unique, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

@Table({ tableName: 'admin_users', timestamps: true })
export class AdminUser extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number; 

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.ENUM('super_admin', 'editor'),
    defaultValue: 'editor',
  })
  declare role: string;

  // ✅ Hash seulement si le mot de passe n'est pas déjà hashé
  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(admin: AdminUser) {
    if (admin.changed('password') && admin.password && !admin.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
    }
  }
}