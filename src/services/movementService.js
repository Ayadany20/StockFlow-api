import InventoryMovement from '../models/inventoryMovement.js';
import Product from '../models/product.js';
import Category from '../models/category.model.js';

export default {
  findAll: () => InventoryMovement.findAll({ include: [Product, Category] }),

  create: async (data) => {
    // ✅ Verificar que el producto exista
    const prod = await Product.findByPk(data.productId);
    if (!prod) {
      const e = new Error('Product not found');
      e.status = 404;
      throw e;
    }

    // ✅ Verificar que la categoría exista
    const cat = await Category.findByPk(data.categoryId);
    if (!cat) {
      const e = new Error('Category not found');
      e.status = 404;
      throw e;
    }

    const prevStock = prod.stock || 0;
    let newStock = prevStock;

    if (data.type === 'entrada') {
      newStock = prevStock + data.quantity;
    } else if (data.type === 'salida') {
      if (prevStock < data.quantity) {
        const e = new Error('Insufficient stock');
        e.status = 400;
        throw e;
      }
      newStock = prevStock - data.quantity;
    }

    // 1️⃣ Actualizar stock del producto
    await prod.update({ stock: newStock });

    // 2️⃣ Crear el movimiento completo
    const movementData = {
      productId: prod.id,
      categoryId: cat.id,
      type: data.type,
      quantity: data.quantity,
      prevStock,
      newStock,
      reference: data.reference || null
    };

    return InventoryMovement.create(movementData);
  }
};
