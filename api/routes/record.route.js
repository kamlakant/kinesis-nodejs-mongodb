'use strict';

const express = require('express');
const router = express.Router();

const recordController = require('../controllers/record.controller');

router.get('/', recordController.getAllRecords);
router.get('/:id', recordController.getRecordById);

module.exports = router;