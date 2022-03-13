import {randomUUID} from "crypto";
import {FastifyReply, FastifyRequest} from "fastify";
import {Logger} from "winston";

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
        detail: "ping db administrator",
        statusCode: 500
    },
    "UNKNOWN ERROR": {
        helpUrl: "https://example.com/unknown-error",
        helpText: "unknown error",
        detail: "ping application developer",
        statusCode: 500
    },
    "NOT_FOUND": {
        detail: "url not found",
        helpUrl: "https://example.com/not-found",
        helpText: "",
        statusCode: 404
    }
}

type ERROR_CODE = keyof typeof errorCodes

export class APPError extends Error {
    statusCode: number
    helpText?: string;
    helpUrl?: string
    id: string;
    code: ERROR_CODE;

    constructor(code: ERROR_CODE, _statusCode?: number, _detail?: string) {
        let {statusCode, detail, helpUrl, helpText} = {...errorCodes[code]}
        super(_detail || detail || "unknown error")
        this.statusCode = _statusCode || statusCode || 500
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


export function fastifyErrorHandlerFactory(logger: Logger) {
    return function fastifyErrorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
        let _err: APPError
        if (error instanceof APPError) { // we are in es6 world right :)?
            _err = error
        } else if (error?.name === "FastifyError") {
            _err = new APPError(error.code, error.statusCode, error.message)
        } else if (error?.validation) {
            _err = new APPError("INVALID_REQUEST", undefined, error.message)
        } else {
            _err = new APPError("UNKNOWN ERROR")
            logger.error("caught runtime error", error)
        }

        reply.status(_err.statusCode)
        reply.send(_err.toJSON())
    }
}