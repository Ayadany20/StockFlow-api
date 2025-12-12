import { Router } from "express";
import ProductController from "../controllers/productController.js";

const router = Router();

/**
 * @openapi
 * /api/products:
 *   get:
 *     summary: Obtener productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/", ProductController.getAll);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por ID
 *     tags: [Products]
 */
router.get("/:id", ProductController.getById);

/**
 * @openapi
 * /api/products:
 *   post:
 *     summary: Crear producto
 *     tags: [Products]
 */
router.post("/", ProductController.create);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Products]
 */
router.put("/:id", ProductController.update);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto
 *     tags: [Products]
 */
router.delete("/:id", ProductController.delete);

export default router;

