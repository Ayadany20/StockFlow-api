import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Obtener usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", UserController.getAll);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */
router.get("/:id", UserController.getById);

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Crear usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/", UserController.create);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/:id", UserController.update);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete("/:id", UserController.delete);

export default router;
