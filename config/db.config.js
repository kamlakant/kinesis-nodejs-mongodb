'use strict';

const mongoose = require('mongoose');

const dbURL = 'DB_URL_PLACEHOLDER'; // TODO - Replace with actual

mongoose.connect(dbURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;