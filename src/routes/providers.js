import { Router } from 'express';
import ProvidersController from '../controllers/providersController.js';

const router = Router();

router.get('/', ProvidersController.findAll);
router.get('/:id', ProvidersController.findById);
router.post('/', ProvidersController.create);
router.put('/:id', ProvidersController.update);
router.delete('/:id', ProvidersController.remove);

export default router;
