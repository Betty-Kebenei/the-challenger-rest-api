import express from 'express';
const router = express.Router();

import monthController from '../controllers/monthController';
import dailyController from '../controllers/dailycontroller';

router.post('', monthController.postMonth);
router.get('', monthController.getAllMonths);
router.get('/:id', monthController.getAMonth);
router.put('/:id', monthController.updateAMonth);
router.post('/:id/daily-data', dailyController.postDaily);
router.get('/:id/daily-data', dailyController.getAllDailyData);
router.get('/:id/daily-data/:id', dailyController.getADailyData);
router.put('/:id/daily-data/:id', dailyController.updateADailyData);

export default router;
