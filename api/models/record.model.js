'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    record: Schema.Types.Mixed
});

module.exports = mongoose.model('Record', RecordSchema);