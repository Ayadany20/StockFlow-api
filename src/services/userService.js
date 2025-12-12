import userRepo from '../repositories/user.repository.js';
import bcrypt from 'bcryptjs';

export default {
  findAll: () => userRepo.findAll(),
  findById: (id) => userRepo.findById(id),

  create: async (data) => {
    data.password = await bcrypt.hash(data.password, 10);
    return userRepo.create(data);
  },

  update: (id, data) => userRepo.update(id, data),
  remove: (id) => userRepo.remove(id)
};
