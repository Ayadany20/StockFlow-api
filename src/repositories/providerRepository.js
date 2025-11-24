import { Provider } from '../models/provider.js';
export default {
  findAll: () => Provider.findAll(),
  findById: (id) => Provider.findByPk(id),
  create: (d) => Provider.create(d),
  update: (id,d) => Provider.update(d,{ where:{ id } }),
  remove: (id) => Provider.destroy({ where:{ id } })
};
