import { z } from 'zod';


export const createGamePayloadModel = z.object({
    score: z.number().int().nonnegative()
})

