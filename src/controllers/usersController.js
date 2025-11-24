import userService from '../services/userService.js';

export default {
  findAll: async (req, res) => res.json(await userService.findAll()),

  findById: async (req, res) => {
    const u = await userService.findById(req.params.id);
    if (!u) return res.status(404).json({ message: 'Not found' });
    res.json(u);
  },

  create: async (req, res) => {
    const u = await userService.create(req.body);
    res.status(201).json(u);
  },

  update: async (req, res) => {
    await userService.update(req.params.id, req.body);
    res.json({ updated: true });
  },

  remove: async (req, res) => {
    await userService.remove(req.params.id);
    res.status(204).end();
  }
};
