import { Router } from 'express';
import AlertsController from '../controllers/alertsController.js';

const router = Router();

router.get('/low-stock', AlertsController.lowStock);

export default router;
