'use strict';

const kcl = require('aws-kcl');
const db = require('../config/db.config');
const logger = require('../util/logger')('consumer');
const Record = require('../api/models/record.model');

const recordProcessor = () => {
    let shardId;

    const saveRecordToDB = (data) => {
        const dbRecord = new Record({
            record: JSON.parse(data)
        });
        dbRecord.save().then(() => {
            logger.info(`Saved to DB: ${dbRecord}`);
        }).catch((err) => {
            logger.error(`Failed to save to DB`);
        });
    }

    return {
        initialize: (initializeInput, completeCallback) => {
            shardId = initializeInput.shardId;
            logger.info(`shardId: ${shardId}`);
            completeCallback();
        },

        processRecords: (processRecordsInput, completeCallback) => {
            if (!processRecordsInput || !processRecordsInput.records) {
                logger.info(`No records`);
                completeCallback();
                return;
            }

            const records = processRecordsInput.records;
            let sequenceNumber;
            for (var i = 0; i < records.length; ++i) {
                let record = records[i];
                let data = new Buffer(record.data, 'base64').toString();
                sequenceNumber = record.sequenceNumber;
                let partitionKey = record.partitionKey;
                logger.info(`Record: ${data}`);
                saveRecordToDB(data);
            }

            if (!sequenceNumber) {
                completeCallback();
                return;
            }

            processRecordsInput.checkpointer.checkpoint(sequenceNumber, function (err, sequenceNumber) {
                completeCallback();
            });
        },

        shutdownRequested: function (shutdownRequestedInput, completeCallback) {
            shutdownRequestedInput.checkpointer.checkpoint(function (err) {
                completeCallback();
            });
        },

        shutdown: function (shutdownInput, completeCallback) {
            if (shutdownInput.reason !== 'TERMINATE') {
                completeCallback();
                return;
            }
            shutdownInput.checkpointer.checkpoint(function (err) {
                completeCallback();
            });
        }
    };
}

kcl(recordProcessor()).run();