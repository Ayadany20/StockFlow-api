import db from "../models/index.js";
const { Category } = db;

export default {
    async findAll() {
        return await Category.findAll();
    },

    async findById(id) {
        return await Category.findByPk(id);
    },

    async create(data) {
        return await Category.create(data);
    },

    async update(id, data) {
        await Category.update(data, { where: { id } });
        return await Category.findByPk(id);
    },

    async delete(id) {
        return await Category.destroy({ where: { id } });
    }
};
