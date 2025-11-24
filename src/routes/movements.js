import { Router } from 'express';
import MovementsController from '../controllers/movementsController.js';

const router = Router();

router.get('/', MovementsController.findAll);
router.post('/', MovementsController.create);

export default router;
