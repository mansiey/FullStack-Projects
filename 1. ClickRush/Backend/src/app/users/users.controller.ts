import type { Request, Response } from "express";
import { profilePayloadModel } from "./users.model.js";
import {getUserProfile, getDailyStats, getWeeklyStats, getGlobalStats} from "./users.service.js";
import { usersTable } from "../../db/schema.js";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";


class usersController {

    public async handleGetProfile(req: Request, res: Response) {

        //@ts-ignore
        const userId = req.user.id;

        // calling the service to get user's info 
        const user = await getUserProfile(userId);

        //if user not found
        if (!user) {
            return res.status(404).json({
                message: "User does not exist!"
            });
        }


        // Generate all the leaderboards
        const daily = await getDailyStats(userId);
        const weekly = await getWeeklyStats(userId);
        const global = await getGlobalStats(userId);


        // generate profile for the user
        return res.status(200).json({
            user,

            stats: {
                totalGames: global.totalGames,
                totalScore: global.score
            },

            leaderboard: {
                daily,
                weekly,
                global
            }

        });
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

        //extract userName if payload is validated
        const { userName } = validationResult.data;
    
        const updatedUser = await db.update(usersTable).set({userName}).where(eq(usersTable.id, userId))
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
