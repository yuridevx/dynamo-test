import {FastifyInstance} from "fastify";
import XRay from "aws-xray-sdk";

export function setupHeaders(fastify: FastifyInstance) {
    fastify.addHook("preHandler", async (request, reply) => {
        let requestId = request.headers['request-id'] as string
        let transactionId = request.headers['transaction-id'] as string
        let correlationId = request.headers['correlation-id'] as string

        request.requestId = requestId
        request.transactionId = transactionId

        const segment = XRay.getSegment()
        if (segment) {
            segment.addAnnotation("request-id", requestId)
            segment.addAnnotation("transaction-id", transactionId)
        }

        if (correlationId) {
            reply.header('correlation-id', correlationId)
        }
    })
}