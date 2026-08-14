import type { Request, Response } from "express";
import { count, sum, desc, eq, gte} from 'drizzle-orm';
import { gamesTable, usersTable } from "../../db/schema.js";
import { db } from './../../db/index.js';

class leaderboardsController {
    public async handleDailyLeaderboard(req: Request, res: Response){
        const startDay = new Date();
        startDay.setHours(0, 0, 0, 0);

        const results = await db.select({
            userName: usersTable.userName,
            totalGames: count(gamesTable.id),
            totalScore: sum(gamesTable.score)
        }).from(gamesTable)
        .innerJoin(usersTable, eq(gamesTable.userId, usersTable.id))
        .where(gte(gamesTable.playedAt, startDay))
        .groupBy(usersTable.userName).orderBy(desc(sum(gamesTable.score))).limit(10);

        const leaderboard = results.map((user, index) => ({
            rank : index + 1,
            ...user
        }));

        return res.status(201).json({
            message: "The daily leaderboard is created based on the games played today!",
            leaderboard
        })
    }

    public async handleWeeklyLeaderboard(req: Request, res: Response){
        //first figure out today
        const currday = new Date();
        const currdayNum = currday.getDay();   // sun->0, mon->1, ....., sat->6
        //handle edge case of being sunday
        const daysSinceMonday = currdayNum === 0 ? 6 : currdayNum-1;

        //now set the start of the week
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);
        startOfWeek.setHours(0, 0, 0 ,0);

        const results = await db.select({
            userName: usersTable.userName,
            totalGames: count(gamesTable.id),
            totalScore: sum(gamesTable.score)
        }).from(gamesTable)
        .innerJoin(usersTable, eq(gamesTable.userId, usersTable.id))
        .where(gte(gamesTable.playedAt, startOfWeek))
        .groupBy(usersTable.userName).orderBy(desc(sum(gamesTable.score))).limit(10);

        const leaderboard = results.map((user, index) => ({
            rank : index + 1,
            ...user
        }));

        return res.status(201).json({
            message: "The weekly leaderboard is created based on all the games played in current week!",
            leaderboard
        })
    }

    public async handleGloabalLeaderboard(req: Request, res: Response){
        
        const results = await db.select({
            userName: usersTable.userName,
            totalGames: count(gamesTable.id),
            totalScore: sum(gamesTable.score)
        }).from(gamesTable)
        .innerJoin(usersTable, eq(gamesTable.userId, usersTable.id))
        .groupBy(usersTable.userName).orderBy(desc(sum(gamesTable.score))).limit(10);

        const leaderboard = results.map((user, index) => ({
            rank : index + 1,
            ...user
        }));

        return res.status(201).json({
            message: "The global leaderboard is created based on all the games available!",
            leaderboard
        })
    }
}


export default leaderboardsController;