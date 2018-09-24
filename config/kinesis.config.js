'use strict';

const kinesisConfig = {
    streamName: 'STREAM_NAME_PLACEHOLDER',  // TODO - Replace with actual
    waitBetweenPutRecords: 10000,
    recordsPerBatch: 10
}

module.exports = kinesisConfig;