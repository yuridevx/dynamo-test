import awsLambdaFastify from 'aws-lambda-fastify'
import {CatalogRepo} from "./catalog/repo.mjs";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {fastifyFactory} from "./app.mjs";
import winston from "winston";

// Configuration can be also abstracted in some factory, but let's keep it simple for a test task
const dynamoDB = new DynamoDBClient({})

if (!process.env.TABLE_NAME) {
    throw new Error("table name not defined")
}

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});


const repo = new CatalogRepo(
    dynamoDB,
    process.env.TABLE_NAME!,
    logger
)

const app = fastifyFactory(repo, logger)
export const handler = awsLambdaFastify(app)
await app.ready()