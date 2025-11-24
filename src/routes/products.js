import { Router } from 'express';
import ProductsController from '../controllers/productsController.js';

const router = Router();

router.get('/', ProductsController.findAll);
router.get('/:id', ProductsController.findById);
router.post('/', ProductsController.create);
router.put('/:id', ProductsController.update);
router.delete('/:id', ProductsController.remove);

export default router;
