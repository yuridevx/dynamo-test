import {fastify} from 'fastify'
import {CatalogRepo} from "./catalog/repo.mjs";
import {catalogRoutes} from "./catalog/routes.mjs";
import {fastifyErrorHandlerFactory} from "./errors.mjs";
import {Logger} from "winston";
import jwt from 'fastify-jwt'
import {setupCorrelation} from "./hooks.mjs";

export function fastifyFactory(
    repo: CatalogRepo,
    logger: Logger,
    secret: () => Promise<string>,
) {
    const app = fastify()
    app.register(jwt, {
        secret,
    })
    app.setErrorHandler(fastifyErrorHandlerFactory(logger))
    setupCorrelation(app)
    catalogRoutes(app, repo)
    return app
}

