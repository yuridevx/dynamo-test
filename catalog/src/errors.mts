import {randomUUID} from "crypto";
import {APIGatewayProxyResult} from "aws-lambda";

const errorCodes = {
    "INVALID_REQUEST": {
        helpUrl: "https://example.com/tv-catalog-request",
        helpText: "visit help url",
        detail: "invalid request",
        statusCode: 400,
    },
    "DATABASE_ERROR": {
        helpUrl: "https://example.com/unknown-db-error",
        helpText: "unknown db error",
        detail: "you can do nothing about it :(",
        statusCode: 500
    },
    "UNKNOWN ERROR": {
        helpUrl: "https://example.com/unknown-db-error",
        helpText: "unknown db error",
        detail: "you can do nothing about it :(",
        statusCode: 500
    }
}

type ERROR_CODE = keyof typeof errorCodes

export class RuntimeError extends Error {
    statusCode: number
    helpText?: string;
    helpUrl?: string
    id: string;
    code: ERROR_CODE;

    constructor(code: ERROR_CODE, message?: string) {
        let {statusCode, detail, helpUrl, helpText} = {...errorCodes[code]}
        if (message) {
            detail = message
        }
        super(detail)
        this.statusCode = statusCode
        this.code = code
        this.helpUrl = helpUrl
        this.helpText = helpText
        this.id = randomUUID()
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            detail: this.message,
            helpUrl: this.helpUrl,
            helpText: this.helpText
        }
    }
}


export async function catchAll(fn: () => Promise<APIGatewayProxyResult>): Promise<APIGatewayProxyResult> {
    try {
        return await fn()
    } catch (e: any) {
        if (!(e instanceof RuntimeError)) {
            e = new RuntimeError("UNKNOWN ERROR", e.message)
        }
        return {
            statusCode: e.statusCode,
            body: JSON.stringify(e.toJSON()),
            isBase64Encoded: false
        }
    }
}
