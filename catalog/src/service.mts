import {DynamoDBClient, TransactWriteItemsCommand} from "@aws-sdk/client-dynamodb";
import {TVShow} from "./data.mjs";
import {TransactWriteItem} from "@aws-sdk/client-dynamodb/dist-types/models/models_0";
import {RuntimeError} from "./errors.mjs";

const tableName = process.env.TABLE_NAME
const client = new DynamoDBClient({})

export async function batchWrite(shows: TVShow[]) {
    const items: TransactWriteItem[] = shows.map(show => ({
        Put: {
            Item: show as any,
            TableName: tableName
        }
    }))
    const command = new TransactWriteItemsCommand({
        TransactItems: items
    })
    try {
        await client.send(command)
    } catch (e) {
        console.error(e)
        throw new RuntimeError("DATABASE_ERROR")
    }
}