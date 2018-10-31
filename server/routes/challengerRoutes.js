import express from 'express';
const router = express.Router();

import tokenAuth from '../middleware/authToken';

import userController from '../controllers/userController';
import monthController from '../controllers/monthController';
import dailyController from '../controllers/dailyDataController';

router.post('/signup', userController.registerUser);
router.post('/signin', userController.loginUser);
router.put('/profile', tokenAuth.tokenAuth, userController.addUserProfile);
router.get('/user', tokenAuth.tokenAuth, userController.fetchUser);

router.post('/month-form', tokenAuth.tokenAuth, monthController.postMonth);
router.get('/month-form', tokenAuth.tokenAuth, monthController.getAllMonths);
router.get('/month-form/:id', tokenAuth.tokenAuth, monthController.getAMonth);
router.put('/month-form/:id', tokenAuth.tokenAuth, monthController.updateAMonth);
router.delete('/month-form/:id', tokenAuth.tokenAuth, monthController.deleteAMonth);

router.post('/month-form/:id/daily-data', tokenAuth.tokenAuth, dailyController.postDaily);
router.get('/month-form/:id/daily-data', tokenAuth.tokenAuth, dailyController.getAllDailyData);
router.get('/month-form/:id/daily-data/:id', tokenAuth.tokenAuth, dailyController.getADailyData);
router.put('/month-form/:id/daily-data/:id', tokenAuth.tokenAuth, dailyController.updateADailyData);
router.delete('/month-form/:id/daily-data/:id', tokenAuth.tokenAuth, dailyController.deleteADailyData);

export default router;
