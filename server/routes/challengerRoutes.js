import express from 'express';
const router = express.Router();

import userController from '../controllers/userController';
import monthController from '../controllers/monthController';
import dailyController from '../controllers/dailycontroller';

router.post('/signup', userController.registerUser);

router.post('/month-form', monthController.postMonth);
router.get('/month-form', monthController.getAllMonths);
router.get('/month-form/:id', monthController.getAMonth);
router.put('/month-form/:id', monthController.updateAMonth);

router.post('/month-form/:id/daily-data', dailyController.postDaily);
router.get('/month-form/:id/daily-data', dailyController.getAllDailyData);
router.get('/month-form/:id/daily-data/:id', dailyController.getADailyData);
router.put('/month-form/:id/daily-data/:id', dailyController.updateADailyData);

export default router;
