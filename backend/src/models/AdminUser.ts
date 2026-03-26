import { Table, Column, Model, DataType, Unique, BeforeCreate } from 'sequelize-typescript';
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
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.ENUM('super_admin', 'editor'),
    defaultValue: 'editor',
  })
  role!: string;

  @BeforeCreate
  static async hashPassword(admin: AdminUser) {
    if (admin.password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
    }
  }
}