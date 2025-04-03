import {z} from "zod";

export const createMessageSchema = z.object({
    text: z.string().min(1).max(191),
    likes: z.number().int().min(0).default(0),
    date: z.string()
})