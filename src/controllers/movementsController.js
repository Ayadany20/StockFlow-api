import service from '../services/movementService.js';

export default {
  findAll: async (req, res) => res.json(await service.findAll()),

  create: async (req, res) => {
    try {
      const m = await service.create(req.body);
      res.status(201).json(m);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
