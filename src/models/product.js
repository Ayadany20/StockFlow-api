import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
export const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull:false },
  description: { type: DataTypes.TEXT },
  stock: { type: DataTypes.INTEGER, defaultValue:0 },
  minStock: { type: DataTypes.INTEGER, defaultValue:0 },
  price: { type: DataTypes.DECIMAL(10,2) }
});
