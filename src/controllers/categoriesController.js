import service from '../services/categoryService.js';

export default {
  findAll: async (req, res) => res.json(await service.findAll()),

  findById: async (req, res) => {
    const c = await service.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    res.json(c);
  },

  create: async (req, res) => {
    const c = await service.create(req.body);
    res.status(201).json(c);
  },

  update: async (req, res) => {
    await service.update(req.params.id, req.body);
    res.json({ updated: true });
  },

  remove: async (req, res) => {
    await service.remove(req.params.id);
    res.status(204).end();
  }
};
