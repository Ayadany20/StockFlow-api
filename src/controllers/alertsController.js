import { Product } from '../models/product.js';

export default {
  lowStock: async (req, res) => {
    const items = await Product.findAll({
      where: {
        stock: { [Product.sequelize.Op.lt]: Product.sequelize.col('minStock') }
      }
    });

    res.json(items);
  }
};
