import { User } from '../models/user.js';

export default {
  findAll: () => User.findAll(),
  findById: (id) => User.findByPk(id),
  findByEmail: (email) => User.findOne({ where: { email } }),
  create: (data) => User.create(data),
  update: (id, data) => User.update(data, { where: { id } }),
  remove: (id) => User.destroy({ where: { id } })
};
