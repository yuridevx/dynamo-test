import {randomUUID} from "crypto";
import {FastifyError, FastifyReply, FastifyRequest} from "fastify";
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
    "UNKNOWN_ERROR": {
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
    },
    "UNAUTHORIZED": {
        detail: "Missing or invalid `X-API-KEY` header.",
        helpUrl: "https://www.javainuse.com/jwtgenerator",
        helpText: "Generate jwt token at url",
        statusCode: 401
    }
}

type ERROR_CODE = keyof typeof errorCodes
type ERROR_BASE = typeof errorCodes[ERROR_CODE]

interface ErrorOptions {
    detail?: string
    statusCode?: number
    helpUrl?: string
    helpText?: string
}

export class APPError extends Error {
    statusCode: number
    helpText?: string;
    helpUrl?: string
    id: string;
    code: string;

    constructor(code: ERROR_CODE | string, options?: ErrorOptions) {
        const base: ERROR_BASE = (errorCodes as any)[code] || {}
        const data = {...base, ...options}
        super(data.detail || "unknown error")
        this.statusCode = data.statusCode || 500
        this.code = code || "UNKNOWN_ERROR"
        this.helpUrl = data.helpUrl
        this.helpText = data.helpText
        this.id = randomUUID()
    }

    toJSON() {
        const obj: any = {
            id: this.id,
            code: this.code,
            detail: this.message,
        }

        if (this.helpText) {
            obj.helpText = this.helpText
        }
        if (this.helpUrl) {
            obj.helpUrl = this.helpUrl
        }

        return obj
    }
}

function isFastifyError(error: FastifyError | any): error is FastifyError {
    return error?.name === "FastifyError"
}

export function fastifyErrorHandlerFactory(logger: Logger) {
    return function fastifyErrorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
        let _err: APPError
        console.error(error)
        if (error instanceof APPError) { // we are in es6 world right :)?
            _err = error
        } else if (isFastifyError(error)) {
            _err = new APPError(error.code, {
                statusCode: error.statusCode
            })
        } else if (error?.name === "UnauthorizedError") {
            _err = new APPError("UNAUTHORIZED", {
                detail: error.message
            })
        } else if (error?.validation) {
            _err = new APPError("INVALID_REQUEST", {
                detail: error.message
            })
        } else {
            _err = new APPError("UNKNOWN_ERROR")
            logger.error("caught runtime error", error)
        }

        reply.status(_err.statusCode)
        reply.send(_err.toJSON())
    }
}