// src/services/productService.js
import db from "../models/index.js";
const { Product } = db;

export default {
  findAll: async () => {
    return await Product.findAll();
  },

  findById: async (id) => {
    return await Product.findByPk(id);
  },

  create: async (data) => {
    // data viene de req.body
    return await Product.create(data);
  },

  update: async (id, data) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Producto no encontrado");
    return await product.update(data);
  },

  remove: async (id) => {
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Producto no encontrado");
    return await product.destroy();
  }
};
