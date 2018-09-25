'use strict';

const AWS = require('aws-sdk');
const recordGenerator = require('./record-generator')();
const kinesisConfig = require('../config/kinesis.config');
const logger = require('../util/logger')('producer');

const awsCredentials = new AWS.SharedIniFileCredentials({
    profile: 'default'  // TODO - Replace with custom AWS profile name if required
});

AWS.config.update({
    region: kinesisConfig.region,
    credentials: awsCredentials
});

const kinesis = new AWS.Kinesis();

const produce = () => {
    sendToKinesis(kinesisConfig.recordsPerBatch).then(() => {
        logger.info('Sent to Kinesis successfully');
    }).catch((err) => {
        logger.error('Failure in sending to kinesis: ', err);
    });
}

const sendToKinesis = (totalRecords) => {
    if (totalRecords <= 0) {
        return;
    }
    const records = [];
    for (let i = 0; i < totalRecords; i++) {
        let data = recordGenerator.getRandomRecord();
        let record = {
            Data: JSON.stringify(data),
            PartitionKey: `${data.firstName}-${data.lastName}-${data.age}`
        };
        records.push(record);
    }
    logger.info('Batch of records to written to Kinesis: ', records);
    const recordsParams = {
        Records: records,
        StreamName: kinesisConfig.streamName,
    }
    return kinesis.putRecords(recordsParams).promise();
}

setInterval(() => {
    produce();
}, kinesisConfig.waitBetweenPutRecords);