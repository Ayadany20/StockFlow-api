import sequelize from '../config/database.js';
import User from './user.js';
import Category from './category.model.js';
import Product from './product.js';
import Provider from './provider.js';
import InventoryMovement from './inventoryMovement.js';

// Crear objeto db que contiene Sequelize y todos los modelos
const db = {
  sequelize,
  Sequelize: sequelize.constructor,
  User,
  Category,
  Product,
  Provider,
  InventoryMovement,
};

/* ==========================
   DEFINIR RELACIONES
   ========================== */

// Category → Product
db.Category.hasMany(db.Product, { foreignKey: 'categoryId' });
db.Product.belongsTo(db.Category, { foreignKey: 'categoryId' });

// Provider → Product
db.Provider.hasMany(db.Product, { foreignKey: 'providerId' });
db.Product.belongsTo(db.Provider, { foreignKey: 'providerId' });

// Product → InventoryMovement
db.Product.hasMany(db.InventoryMovement, { foreignKey: 'productId' });
db.InventoryMovement.belongsTo(db.Product, { foreignKey: 'productId' });

export default db;
