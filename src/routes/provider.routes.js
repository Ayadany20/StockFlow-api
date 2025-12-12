import { Router } from "express";
import ProviderController from "../controllers/providerController.js";

const router = Router();

/**
 * @openapi
 * /api/providers:
 *   get:
 *     summary: Obtener proveedores
 *     tags: [Providers]
 */
router.get("/", ProviderController.getAll);

/**
 * @openapi
 * /api/providers:
 *   post:
 *     summary: Crear proveedor
 *     tags: [Providers]
 */
router.post("/", ProviderController.create);

/**
 * @openapi
 * /api/providers/{id}:
 *   put:
 *     summary: Actualizar proveedor
 *     tags: [Providers]
 */
router.put("/:id", ProviderController.update);

/**
 * @openapi
 * /api/providers/{id}:
 *   delete:
 *     summary: Eliminar proveedor
 *     tags: [Providers]
 */
router.delete("/:id", ProviderController.delete);

export default router;
