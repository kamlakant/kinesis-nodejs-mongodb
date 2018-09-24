'use strict';

const log4js = require('log4js');

const config = {
    appenders: {
        api: {
            type: 'file',
            filename: 'logs/api.log'
        },
        consumer: {
            type: 'file',
            filename: 'logs/consumer.log'
        },
        producer: {
            type: 'file',
            filename: 'logs/producer.log'
        },
        default: {
            type: 'console'
        }
    },
    categories: {
        api: {
            appenders: ['api'],
            level: 'debug'
        },
        consumer: {
            appenders: ['consumer'],
            level: 'debug'
        },
        producer: {
            appenders: ['producer'],
            level: 'debug'
        },
        default: {
            appenders: ['default'],
            level: 'debug'
        }
    }
};

log4js.configure(config);

const logger = (category) => {
    return log4js.getLogger(category);
}

module.exports = logger;