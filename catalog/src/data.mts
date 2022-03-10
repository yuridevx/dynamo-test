import {RuntimeError} from "./errors.mjs";
import joi from 'joi'

export interface TVShow {
    slug: string
    title: string
    tvChannel: string
    country?: string
    description?: string
    drm?: boolean
    genre?: string
    language?: string
    primaryColour?: string
}

const schema = joi.object({
    slug: joi.string().required(),
    title: joi.string().required(),
    tvChannel: joi.string().required(),
    country: joi.string(),
    description: joi.string(),
    drm: joi.boolean(),
    genre: joi.string(),
    language: joi.string(),
    primaryColour: joi.string(),
    episodeCount: joi.number()
})

const bodySchema = joi.array().min(1).max(25).items(schema)

export function parseBody(body: string | null): TVShow[] {
    if (typeof body != "string") {
        throw new RuntimeError("INVALID_REQUEST", "empty body")
    }
    let obj
    try {
        obj = JSON.parse(body)
    } catch (error: any) {
        throw new RuntimeError("INVALID_REQUEST", error.message)
    }
    const {error, value} = bodySchema.validate(obj)
    if (error) {
        throw new RuntimeError("INVALID_REQUEST", error.message)
    }
    return value
}