import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './product.js';
import Category from './category.model.js';

const InventoryMovement = sequelize.define('InventoryMovement', {
  type: {
    type: DataTypes.ENUM('entrada', 'salida', 'ajuste'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  prevStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  newStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, 
      key: 'id'
    }
  }
}, {
  tableName: 'inventory_movements',
  timestamps: true
});

InventoryMovement.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(InventoryMovement, { foreignKey: 'productId' });

InventoryMovement.belongsTo(Category, { foreignKey: 'categoryId', allowNull:false });
Category.hasMany(InventoryMovement, { foreignKey: 'categoryId' });

export default InventoryMovement;
