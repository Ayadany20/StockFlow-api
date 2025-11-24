import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
export const Provider = sequelize.define('Provider', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull:false },
  phone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(150) },
  address: { type: DataTypes.STRING(255) }
});
