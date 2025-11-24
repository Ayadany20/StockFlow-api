import { Product } from '../models/product.js';
export default {
  findAll: (opts) => Product.findAll(opts),
  findById: (id) => Product.findByPk(id),
  create: (data) => Product.create(data),
  update: (id,data) => Product.update(data, { where: { id } }),
  remove: (id) => Product.destroy({ where: { id } })
};
