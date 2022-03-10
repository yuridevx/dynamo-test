import {APIGatewayEvent, APIGatewayProxyResult} from 'aws-lambda'
import {parseBody} from "./data.mjs";
import {batchWrite} from "./service.mjs";
import {catchAll} from "./errors.mjs";

export async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    return await catchAll(async () => {
        const shows = parseBody(event.body)
        await batchWrite(shows)
        return {
            statusCode: 204,
            body: ""
        }
    })
}