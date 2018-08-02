const express = require('express');
const router = express.Router();

const monthController = require('../controllers/monthController');
const dailyController = require('../controllers/dailycontroller');

router.get('/test', monthController.test);

module.exports = router;
