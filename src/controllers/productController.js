import ProductService from "../services/productService.js";

export default {
  getAll: async (req, res) => {
    const products = await ProductService.findAll();
    res.json(products);
  },

  getById: async (req, res) => {
    const product = await ProductService.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  },

  create: async (req, res) => {
    const newProduct = await ProductService.create(req.body);
    res.status(201).json(newProduct);
  },

  update: async (req, res) => {
    await ProductService.update(req.params.id, req.body);
    res.json({ updated: true });
  },

  delete: async (req, res) => {
    await ProductService.remove(req.params.id);
    res.status(204).end();
  }
};
