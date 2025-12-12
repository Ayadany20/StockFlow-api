import service from '../services/providerService.js';

export default {
  getAll: async (req, res) => {
    const providers = await service.findAll();
    res.json(providers);
  },

  create: async (req, res) => {
    const provider = await service.create(req.body);
    res.status(201).json(provider);
  },

  update: async (req, res) => {   // <-- Este es necesario
    try {
      const updated = await service.update(req.params.id, req.body);
      res.json({ updated });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    await service.remove(req.params.id);
    res.status(204).end();
  }
};
