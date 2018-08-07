import express from 'express';
const router = express.Router();

import monthController from '../controllers/monthController';
import dailyController from '../controllers/dailycontroller';

router.get('/test', monthController.test);

export default router;
