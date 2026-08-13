import type { Request, Response } from 'express';
import { createGamePayloadModel } from './games.model.js';
import { db } from './../../db/index.js'
import { gamesTable } from '../../db/schema.js';



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

        return res.status(200).json({
            message: "Score added successfully",
            game: result[0]
        })
    }
}

export default createGameController;