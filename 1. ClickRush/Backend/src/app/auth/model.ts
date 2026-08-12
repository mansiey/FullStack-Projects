import { email, z } from 'zod';

export const signupPayloadModel = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().nullable().optional(),
    email: z.email(),
    password: z.string().min(8),
})

export const signinPayloadModel = z.object({
    email: z.email(),
    password: z.string().min(8)
})