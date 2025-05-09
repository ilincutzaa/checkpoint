import {z} from "zod";

export const createGameSchema = z.object({
    name: z.string().min(1).max(255),
    genre: z.string().min(0).max(255),
    platform: z.string().min(0).max(255),
    backlogPriority: z.number().int().min(0).default(0),

    hoursPlayed: z.number().min(0).default(0),
    timesCompleted: z.number().int().min(0).default(0),
    completionType: z.string().min(0).max(255),
    status: z.string().min(0).max(255),

    dateFirstFinished: z.string(),
    rating: z.number().int().min(0).max(5).default(0),
    description: z.string().min(0).max(511),

    tags: z.array(z.string().min(1)).optional(),
})