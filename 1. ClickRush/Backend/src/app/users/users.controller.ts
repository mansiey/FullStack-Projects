import type { Request, Response } from 'express';
import { profilePayloadModel } from './users.model.js';
import { usersTable } from '../../db/schema.js';
import { db } from './../../db/index.js';
import { eq } from 'drizzle-orm';
import { email } from 'zod';


class usersController {
    public async handleGetProfile(req: Request, res: Response) {
        //@ts-ignore
        const userId = req.user.id;

        const user = await db.select({
            id: usersTable.id,
            firstName: usersTable.firstName,
            userName: usersTable.userName,
            email: usersTable.email
        }).from(usersTable).where(eq(usersTable.id, userId));

        if(user.length === 0){
            return res.status(404).json({
                message: "User does not exist!"
            })
        }

        return res.status(200).json({
            user: user[0]
        })

    }

    public async handleUpdateProfile(req: Request, res: Response) {
        //@ts-ignore
        const userId = req.user.id;

        const validationResult = await profilePayloadModel.safeParseAsync(req.body);

        if (validationResult.error) {
            return res.status(400).json({
                message: "Body validation failed!",
                error: validationResult.error.issues
            });
        }

        const { userName } = validationResult.data;

        const updatedUser = await db
            .update(usersTable)
            .set({
                userName
            })
            .where(eq(usersTable.id, userId))
            .returning({
                id: usersTable.id,
                userName: usersTable.userName
            });

        if (updatedUser.length === 0) {
            return res.status(404).json({
                message: "User does not exist!"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully!",
            user: updatedUser[0]
        });
    }
}

export default usersController;