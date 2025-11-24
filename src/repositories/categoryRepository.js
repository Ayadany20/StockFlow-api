import { Category } from '../models/category.js';

export default {
  findAll: () => Category.findAll(),
  findById: (id) => Category.findByPk(id),
  create: (data) => Category.create(data),
  update: (id, data) => Category.update(data, { where: { id } }),
  remove: (id) => Category.destroy({ where: { id } })
};
