import { Router } from "express";
import movementController from "../controllers/movementController.js";

const router = Router();

/**
 * @openapi
 * /api/movements:
 *   get:
 *     summary: Listar movimientos de inventario
 *     tags: [Movements]
 */
router.get("/", movementController.getAll);

/**
 * @openapi
 * /api/movements:
 *   post:
 *     summary: Crear movimiento
 *     tags: [Movements]
 */
router.post("/", movementController.create);

export default router;
