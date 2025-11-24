import service from '../services/providerService.js';

export default {
  findAll: async (req, res) => res.json(await service.findAll()),
  findById: async (req, res) => {
    const p = await service.findById(req.params.id);
    if (!p) return res.status(404).end();
    res.json(p);
  },
  create: async (req, res) => res.status(201).json(await service.create(req.body)),
  update: async (req, res) => { await service.update(req.params.id, req.body); res.json({ updated: true }); },
  remove: async (req, res) => { await service.remove(req.params.id); res.status(204).end(); }
};
