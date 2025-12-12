const alertController = {
  getAll(req, res) { res.json({ message: "Lista de alertas" }); },
  getById(req, res) { res.json({ message: "Alerta encontrada", id: req.params.id }); },
  create(req, res) { res.json({ message: "Alerta creada", data: req.body }); },
  update(req, res) { res.json({ message: "Alerta actualizada", id: req.params.id, data: req.body }); },
  delete(req, res) { res.json({ message: "Alerta eliminada", id: req.params.id }); }
};

export default alertController;
