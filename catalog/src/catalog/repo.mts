import {marshall} from "@aws-sdk/util-dynamodb";
import {DynamoDBClient, TransactWriteItem, TransactWriteItemsCommand} from "@aws-sdk/client-dynamodb";

import {TVShow} from "./data.mjs";
import {APPError} from "../errors.mjs";
import {Logger} from "winston";

export class CatalogRepo {
    constructor(
        private client: DynamoDBClient,
        private tableName: string,
        private logger: Logger
    ) {
    }

    async batchWrite(shows: TVShow[]) {
        const items: TransactWriteItem[] = shows.map(show => ({
            Put: {
                Item: marshall(show),
                TableName: this.tableName
            }
        }))
        const command = new TransactWriteItemsCommand({
            TransactItems: items
        })
        try {
            await this.client.send(command)
        } catch (e: any) {
            console.error(e)
            throw new APPError("DATABASE_ERROR", e.message)
        }
    }
}