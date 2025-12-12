
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define(
  'Product',
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: true },
    providerId: { type: DataTypes.INTEGER, allowNull: true }
  },
  {
    tableName: 'products',
    timestamps: true
  }
);

export default Product;
