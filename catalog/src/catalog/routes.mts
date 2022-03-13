import {FastifyInstance} from "fastify";
import {TVShow, TVShowArray} from "./data.mjs";
import {CatalogRepo} from "./repo.mjs";
import {APPError} from "../errors.mjs";

export function catalogRoutes(
    app: FastifyInstance,
    repo: CatalogRepo
) {
    app.route({
        url: "/catalogue",
        method: "POST",
        schema: {
            body: TVShowArray
        },
        async handler(
            request,
            reply
        ) {
            await request.jwtVerify({
                algorithms: ["HS256"]
            })
            await repo.batchWrite(request.body as TVShow[]) // validated by fastify schema
            reply.status(204)
        }
    })
    app.route({
        url: "*",
        method: ['DELETE', 'GET', 'HEAD', 'PATCH', 'POST', 'PUT', 'OPTIONS'],
        async handler() {
            throw new APPError("NOT_FOUND")
        }
    })
}