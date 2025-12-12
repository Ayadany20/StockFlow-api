// src/repositories/product.repository.js
import db from "../models/index.js";

const Product = db.Product;

export default {
    async findAll() {
        return await Product.findAll();
    },

    async findById(id) {
        return await Product.findByPk(id);
    },

    async create(data) {
        return await Product.create(data);
    },

    async update(id, data) {
        await Product.update(data, { where: { id } });
        return await Product.findByPk(id);
    },

    async delete(id) {
        return await Product.destroy({ where: { id } });
    }
};
