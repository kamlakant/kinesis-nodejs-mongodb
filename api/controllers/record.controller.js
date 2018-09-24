'use strict';

const Record = require('../models/record.model');

const getAllRecords = (req, res, next) => {
    const recordsFound = Record.find({});

    recordsFound.then((records) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(records));
    }).catch((err) => next(err));
};

const getRecordById = (req, res, next) => {
    const recordFound = Record.findById(req.params.id);

    recordFound.then((record) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(record));
    }).catch((err) => next(err));
};

module.exports = {
    getAllRecords,
    getRecordById
};