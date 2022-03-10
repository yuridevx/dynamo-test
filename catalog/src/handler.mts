import {APIGatewayEvent, APIGatewayProxyResult} from 'aws-lambda'

export async function handler(event: APIGatewayEvent): Promise<APIGatewayProxyResult> {
    return {
        statusCode: 200,
        body: JSON.stringify(event),
        isBase64Encoded: false
    }
}