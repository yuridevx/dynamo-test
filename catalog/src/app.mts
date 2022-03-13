import {fastify} from 'fastify'
import {CatalogRepo} from "./catalog/repo.mjs";
import {catalogRoutes} from "./catalog/routes.mjs";
import {fastifyErrorHandlerFactory} from "./errors.mjs";
import {Logger} from "winston";

export function fastifyFactory(
    repo: CatalogRepo,
    logger: Logger,
) {
    const app = fastify()
    app.setErrorHandler(fastifyErrorHandlerFactory(logger))
    catalogRoutes(app, repo)
    return app
}

