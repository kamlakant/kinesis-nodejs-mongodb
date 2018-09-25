# AWS Kinesis Producer and Consumer Implementation in NodeJS and MongoDB

This application demonstrates a generic AWS Kinesis producer and consumer implementation in NodeJS using MongoDB as a data store. It also exposes an API to retrieve the records from MongoDB.

## Pre-requisites

-   [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) should be configured. This application depends on AWS credentials stored in `.aws/credentials` file.
-   [MongoDB](https://www.mongodb.com/download-center#community) should be configured.
-   [JRE 1.8](https://www.oracle.com/technetwork/java/javase/downloads/index.html) or above should be installed.

## How it works

This application can be divided into three major parts:

- **Producer**
    The producer uses [aws-sdk](https://aws.amazon.com/sdk-for-node-js/) to repeatedly publish batch of records into Kinesis stream using [PutRecords](https://docs.aws.amazon.com/kinesis/latest/APIReference/API_PutRecords.html).

- **Consumer**
    The consumer uses [Kinesis Client Library (KCL)](https://docs.aws.amazon.com/streams/latest/dev/kinesis-record-processor-implementation-app-nodejs.html) to create a poller which processes records retrieved from the Kinesis stream. KCL is a Java library (hence the need for JRE) and provides an interface for other languages. KCL internally creates a DynamoDB table to keep track of the application's state.
    The consumer also stores the retrived records into MongoDB data store.

- **API Server**
    The API server exposes endpoints to retrieve record(s) from the MongoDB data store.

## Setup

Step 1 - Clone this repository, navigate to the directory and run `npm install`.

Step 2 - Create an AWS Kinesis Stream using AWS CLI [create-stream](https://docs.aws.amazon.com/cli/latest/reference/kinesis/create-stream.html) command.
```
aws kinesis create-stream --stream-name <value> --shard-count <value>
```

Step 3 - Substitute the placeholder values with actual values in the code. All such placeholder values have been marked with a `TODO` for easy identification.
Here is the list of files which have placeholder values:
```
/config/db.config.js
/config/kinesis.config.js
/consumer/consumer.properties
/producer/producer.js
```

Step 4 - Run the producer from the base directory using below command:
```
npm run start-producer
```
Producer writes the logs to `/logs/producer.log`.

Step 5 - Open another terminal and run the consumer from the base directory using below command:
```
npm run start-consumer
```
Producer writes the logs to `/logs/consumer.log`.

Step 6 - Open another terminal and start the API server the base directory using below command:
```
npm run start-api
```
API server writes the logs to `/logs/api.log`.

## Test
Fire up any HTTP client (e.g. [Postman](https://www.getpostman.com/)) and send GET request at `/records` endpoint. It should fetch currently stored records from MongoDB.
```
GET http://localhost:10987/records
```

## Cleanup

It's important to cleanup the AWS resources (Kinesis Stream and DynamoDB table) created for this application. Use below commands or AWS Console to delete these resources:
```
aws kinesis delete-stream --stream-name <value>
aws dynamodb delete-table --table-name <value>
```
