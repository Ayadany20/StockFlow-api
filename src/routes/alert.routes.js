import { Router } from "express";
import alertController from "../controllers/alertController.js";

const router = Router();

/**
 * @openapi
 * /api/alerts:
 *   get:
 *     summary: Obtener alertas de inventario
 *     tags: [Alerts]
 */
router.get("/", alertController.getAll);
router.get('/:id', alertController.getById);
router.post('/', alertController.create);
router.put('/:id', alertController.update);
router.delete('/:id', alertController.delete);

export default router;
