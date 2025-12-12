import  User  from '../models/user.js';

export default {
    async findByEmail(email) {
        return await User.findOne({ email });
    },

    async findById(id) {
        return await User.findById(id);
    },

    async create(data) {
        return await User.create(data);
    }
};
