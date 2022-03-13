import {fastify} from 'fastify'
import {CatalogRepo} from "./catalog/repo.mjs";
import {catalogRoutes} from "./catalog/routes.mjs";
import {fastifyErrorHandler} from "./errors.mjs";

export function fastifyFactory(
    repo: CatalogRepo,
) {
    const app = fastify()
    app.setErrorHandler(fastifyErrorHandler)
    catalogRoutes(app, repo)
    return app
}

