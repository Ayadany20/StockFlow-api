import Provider from '../models/provider.js';

export default {
    async findAll() {
        return await Provider.find();
    },

    async findById(id) {
        return await Provider.findById(id);
    },

    async create(data) {
        return await Provider.create(data);
    },

    async update(id, data) {
        return await Provider.findByIdAndUpdate(id, data, { new: true });
    },

    async delete(id) {
        return await Provider.findByIdAndDelete(id);
    }
};
