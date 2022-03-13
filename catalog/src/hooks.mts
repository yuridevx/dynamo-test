import {FastifyInstance} from "fastify";
import {SegmentLike} from "aws-xray-sdk";

const headerName = 'correlation-id'

export function setupCorrelation(fastify: FastifyInstance) {
    fastify.addHook("onRequest", (request, reply, done) => {
        if (request.headers[headerName]) {
            reply.header(headerName, request.headers[headerName])
        }
        done()
    })
}

export function setupXRay(fastify: FastifyInstance) {
    fastify.addHook("preHandler", async (request, reply) => {
        let requestId = request.headers['request-id'] as string
        let transactionId = request.headers['transaction-id'] as string
        request.requestId = requestId
        request.transactionId = transactionId

        if (request.segment) {
            const segment = request.segment as SegmentLike
            segment.addAnnotation("request-id", requestId)
            segment.addAnnotation("transaction-id", transactionId)
        }

        if (request.headers[headerName]) {
            reply.header(headerName, request.headers[headerName])
        }
    })
}