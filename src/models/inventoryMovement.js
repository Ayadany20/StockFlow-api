import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
export const InventoryMovement = sequelize.define('InventoryMovement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING(10), allowNull:false },
  quantity: { type: DataTypes.INTEGER, allowNull:false }
});
