import express from 'express';
const router = express.Router();

import monthController from '../controllers/monthController';
import dailyController from '../controllers/dailycontroller';

router.get('/test', monthController.test);
router.post('', monthController.postMonth);
router.get('', monthController.getAllMonths);
router.get('/:id', monthController.getAMonth);

export default router;
