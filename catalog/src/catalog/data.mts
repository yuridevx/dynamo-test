import s from "fluent-json-schema";

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

export const TVShowSchema = s.object()
    .prop("slug", s.string())
    .prop("country", s.string())
    .prop("description", s.string())
    .prop("genre", s.string())
    .prop("language", s.string())
    .prop("primaryColour", s.string())
    .prop("title", s.string())
    .prop("tvChannel", s.string())
    .prop("drm", s.boolean())
    .additionalProperties(true) // Explicitly allowing them to fit example request
    .required(["title", "slug", "tvChannel"])

export const TVShowArray = s.array().items(TVShowSchema)