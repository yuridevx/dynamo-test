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
        helpUrl: "http://jwtbuilder.jamiekurtz.com",
        helpText: `alg = "hs256", secret = "${process.env.SECRET_KEY || 'secret'}`,
        statusCode: 401
    }
}

type ERROR_CODE = keyof typeof errorCodes
type ERROR_BASE = typeof errorCodes[ERROR_CODE]

interface ErrorOptions {
    cause?: any
    detail?: string
    statusCode?: number
    helpUrl?: string
    helpText?: string
}

export class APPError extends Error {
    statusCode: number
    helpText?: string
    helpUrl?: string
    id: string
    code: string
    cause?: any
    requestId?: string;
    transactionId?: string;

    constructor(code: ERROR_CODE | string, options?: ErrorOptions) {
        const base: ERROR_BASE = (errorCodes as any)[code] || {}
        const data = {...base, ...options}
        super(data.detail || "unknown error")
        this.statusCode = data.statusCode || 500
        this.code = code || "UNKNOWN_ERROR"
        this.helpUrl = data.helpUrl
        this.helpText = data.helpText
        this.cause = data.cause
        this.id = randomUUID()
    }

    setContext(
        requestId: string,
        transactionId: string
    ) {
        this.requestId = requestId
        this.transactionId = transactionId
    }

    toWebJson() {
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
    return !!error?.code
}

export function fastifyErrorHandlerFactory(logger: Logger) {
    // fastify request is too complex to define
    // @ts-ignore
    return function fastifyErrorHandler(error: any, request: FastifyRequest, reply: FastifyReply) {
        let requestId = request.headers['request-id'] as string
        let transactionId = request.headers['transaction-id'] as string

        let _err: APPError
        if (error instanceof APPError) { // we are in es6 world right :)?
            _err = error
        } else if (isFastifyError(error)) {
            _err = new APPError(error.code, {
                statusCode: error.statusCode || 400,
                detail: error.message,
                cause: error
            })
        } else if (error?.name === "UnauthorizedError") {
            _err = new APPError("UNAUTHORIZED", {
                detail: error.message,
                cause: error
            })
        } else if (error?.validation) {
            _err = new APPError("INVALID_REQUEST", {
                detail: error.message,
                cause: error
            })
        } else {
            _err = new APPError("UNKNOWN_ERROR", {
                cause: error
            })
        }

        _err.setContext(requestId, transactionId)
        if (request.segment) {
            request.segment.addError(error)
            request.segment.addAnnotation("request-id", request)
            request.segment.addAnnotation("transaction-id", transactionId)
        }
        logger.error(_err)

        reply.status(_err.statusCode)
        reply.send(_err.toWebJson())
    }
}