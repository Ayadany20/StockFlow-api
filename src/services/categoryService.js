import db from '../models/index.js';
const { Category } = db;

export default {
  findAll: async () => {
    return Category.findAll();
  },

  findById: async (id) => {
    return Category.findByPk(id);
  },

  create: async (data) => {
    // Aquí es donde se guarda la categoría
    return Category.create({
      name: data.name,
      description: data.description
    });
  },

  update: async (id, data) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Category not found');
    category.name = data.name ?? category.name;
    category.description = data.description ?? category.description;
    return category.save();
  },

  remove: async (id) => {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Category not found');
    return category.destroy();
  }
};
