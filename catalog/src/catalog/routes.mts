import {FastifyInstance} from "fastify";
import {TVShow, TVShowArray} from "./data.mjs";
import {CatalogRepo} from "./repo.mjs";

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
            await repo.batchWrite(request.body as TVShow[]) // validated by fastify schema
            reply.status(204)
        }
    })
}