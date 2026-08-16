import { count, desc, eq, gte, sum } from "drizzle-orm";
import { gamesTable, usersTable } from "../../db/schema.js";
import { db } from "../../db/index.js";


export const getUserProfile = async (userId: string) => {

    const user = await db
        .select({
            id: usersTable.id,
            firstName: usersTable.firstName,
            userName: usersTable.userName,
            email: usersTable.email
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

    return user[0] ?? null;
};


const getStartOfDay = () => {

    const startDay = new Date();

    startDay.setHours(0, 0, 0, 0);

    return startDay;
};


const getStartOfWeek = () => {

    const currentDay = new Date();
    const currentDayNumber = currentDay.getDay();

    const daysSinceMonday = currentDayNumber === 0 ? 6 : currentDayNumber - 1;

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - daysSinceMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    return startOfWeek;
};


const getLeaderboardStats = async (userId: string, startDate?: Date) => {
    let results = db
        .select({
            userId: usersTable.id,
            userName: usersTable.userName,
            firstName: usersTable.firstName,
            totalGames: count(gamesTable.id),
            totalScore: sum(gamesTable.score)
        })
        .from(gamesTable)
        .innerJoin(
            usersTable,
            eq(gamesTable.userId, usersTable.id)
        )
        .$dynamic();


    // If startDate exists, we are calculating Daily or Weekly leaderboard using that param.
    if (startDate) {
        results = results.where(
            gte(gamesTable.playedAt, startDate)
        );
    }


    const users = await results
        .groupBy(
            usersTable.id,
            usersTable.userName,
            usersTable.firstName
        )
        .orderBy(
            desc(sum(gamesTable.score))
        );


    //player's rank in the results
    const userIndex = users.findIndex(
        user => user.userId === userId
    );

    
    // if player has not played yet
    if (userIndex === -1) {
        return {
            score: 0,
            totalGames: 0,
            rank: null
        };
    }

    
    const user = users[userIndex]!;

    return {
        score: Number(user.totalScore ?? 0),
        totalGames: Number(user.totalGames),
        rank: userIndex + 1
    };
};



export const getDailyStats = async (userId: string) => {

    const startOfDay = getStartOfDay();

    return getLeaderboardStats(
        userId,
        startOfDay
    );
};



export const getWeeklyStats = async (userId: string) => {

    const startOfWeek = getStartOfWeek();

    return getLeaderboardStats(
        userId,
        startOfWeek
    );
};



export const getGlobalStats = async (userId: string) => {

    return getLeaderboardStats(userId);
};