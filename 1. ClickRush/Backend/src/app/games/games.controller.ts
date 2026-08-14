import type { Request, Response } from 'express';
import { createGamePayloadModel } from './games.model.js';
import { db } from './../../db/index.js'
import { gamesTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';



class createGameController {
    public async handleGameCreation(req: Request, res: Response){
        const validationResult = await createGamePayloadModel.safeParseAsync(req.body);

        if(validationResult.error){
            return res.status(400).json({
                message: "Body validation failed",
                error: validationResult.error.issues,
            });
        }

        const { score } = validationResult.data;

        //@ts-ignore
        const userId = req.user.id;

        const result = await db.insert(gamesTable).values({
            userId,
            score
        }).returning();

        return res.status(201).json({
            message: "Score added successfully",
            game: result[0]
        })
    }

    public async handleGetGames(req: Request, res: Response){
        //@ts-ignore
        const user = req.user.id;

        const userResult = await db.select().from(gamesTable).where(eq(gamesTable.userId, user));
        if(userResult.length === 0){
            return res.status(200).json({
                message: "User has not played any game",
                userResult
            })
        }

        return res.status(200).json({
            message: "These are the list of all the games played!",
            userResult
        })

    }

}

export default createGameController;