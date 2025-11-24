import { Router } from 'express';
import CategoriesController from '../controllers/categoriesController.js';

const router = Router();

router.get('/', CategoriesController.findAll);
router.get('/:id', CategoriesController.findById);
router.post('/', CategoriesController.create);
router.put('/:id', CategoriesController.update);
router.delete('/:id', CategoriesController.remove);

export default router;
