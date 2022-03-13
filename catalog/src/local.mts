import {fastifyFactory} from "./app.mjs";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {CatalogRepo} from "./catalog/repo.mjs";
import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ],
});

const dbClient = new DynamoDBClient({})
const repo = new CatalogRepo(
    dbClient,
    "TVCatalog",
    logger
)

const secretFn = async () => "secret"

const app = fastifyFactory(
    repo,
    logger,
    secretFn,
    false
)

await app.listen(8080)