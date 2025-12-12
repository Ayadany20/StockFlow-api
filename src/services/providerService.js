import Provider from '../models/provider.js';

export default {
  findAll: async () => await Provider.findAll(),
  create: async (data) => await Provider.create(data),
  update: async (id, data) => {
    const provider = await Provider.findByPk(id);
    if (!provider) throw new Error('Provider not found');
    return await provider.update(data);
  },
  remove: async (id) => {
    const provider = await Provider.findByPk(id);
    if (!provider) throw new Error('Provider not found');
    return await provider.destroy();
  }
};
