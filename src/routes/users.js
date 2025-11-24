import { Router } from 'express';
import UsersController from '../controllers/usersController.js';

const router = Router();

router.get('/', UsersController.findAll);
router.get('/:id', UsersController.findById);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.remove);

export default router;
