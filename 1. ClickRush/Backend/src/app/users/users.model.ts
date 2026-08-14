import { z } from 'zod';

export const profilePayloadModel = z.object({
    userName: z.string().max(30),
})