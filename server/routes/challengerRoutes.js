import express from 'express';
const router = express.Router();

import monthController from '../controllers/monthController';
import dailyController from '../controllers/dailycontroller';

router.get('/test', monthController.test);
router.post('', monthController.postMonth);
router.get('', monthController.getAllMonths);
router.get('/:id', monthController.getAMonth);
router.put('/:id', monthController.updateAMonth);
router.post('/:id/daily-data', dailyController.postDaily);
router.get('/:id/daily-data', dailyController.getAllDailyData);

export default router;
