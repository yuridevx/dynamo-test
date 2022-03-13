import {randomUUID} from "crypto";
import {FastifyReply, FastifyRequest} from "fastify";

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

export class APPError extends Error {
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


export function fastifyErrorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
    let _err: APPError
    if (error instanceof APPError) {
        _err = error
    } else {
        _err = new APPError("UNKNOWN ERROR", error.message)
    }

    reply.status(_err.statusCode)
    reply.send(_err.toJSON())
}