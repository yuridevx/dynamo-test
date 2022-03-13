import awsLambdaFastify from 'aws-lambda-fastify'
import {CatalogRepo} from "./catalog/repo.mjs";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {fastifyFactory} from "./app.mjs";
import winston from "winston";

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});

// Configuration can be also abstracted in some factory, but let's keep it simple for a test task
const dynamoDB = new DynamoDBClient({})

if (!process.env.TABLE_NAME) {
    logger.error('TABLE_NAME env is not present')
}

if (!process.env.SECRET_KEY) { // I know it's not secure enough, details in comments
    throw new Error("SECRET_KEY env is not present")
}

const repo = new CatalogRepo(
    dynamoDB,
    process.env.TABLE_NAME!,
    logger
)

const app = fastifyFactory(repo, logger, process.env.SECRET_KEY)
export const handler = awsLambdaFastify(app)
await app.ready()