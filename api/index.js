'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('../util/logger')('api');

const port = process.env.PORT || 10987;

const db = require('../config/db.config');

const recordRouter = require('./routes/record.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/records', recordRouter);

app.listen(port, () => {
    logger.info('Server is running on port: ' + port);
});