const express = require('express');
const flagController = require('../controllers/flagController');
const router = express.Router();

router.get('/', flagController.getflag);

module.exports = router;
