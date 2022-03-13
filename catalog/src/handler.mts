import awsLambdaFastify from 'aws-lambda-fastify'
import {CatalogRepo} from "./catalog/repo.mjs";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {fastifyFactory} from "./app.mjs";

// Configuration can be also abstracted in some factory, but let's keep it simple for a test task
const dynamoDB = new DynamoDBClient({})

if (!process.env.TABLENAME) {
    throw new Error("table name not defined")
}

const repo = new CatalogRepo(
    dynamoDB,
    process.env.TABLE_NAME!
)

const app = fastifyFactory(repo)
export const handler = awsLambdaFastify(app)
await app.ready()