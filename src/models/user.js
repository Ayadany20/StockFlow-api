import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
export const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100) },
  email: { type: DataTypes.STRING(120), allowNull:false, unique:true },
  password: { type: DataTypes.STRING(255), allowNull:false },
  role: { type: DataTypes.STRING(50), defaultValue: 'user' }
});
