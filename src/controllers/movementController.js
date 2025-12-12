import movementService from '../services/movementService.js';

const movementController = {

  async getAll(req, res) {
    try {
      const movements = await movementService.findAll();
      res.json(movements);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const movement = await movementService.findById(req.params.id);
      if (!movement) {
        return res.status(404).json({ error: "Movimiento no encontrado" });
      }
      res.json(movement);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const movement = await movementService.create(req.body);
      res.status(201).json(movement);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await movementService.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await movementService.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(err.status || 500).json({ error: err.message });
    }
  }
};

export default movementController;
