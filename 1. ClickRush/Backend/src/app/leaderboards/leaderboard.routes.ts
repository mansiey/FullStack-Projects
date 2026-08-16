import express from 'express';
import type { Router } from 'express';
import leaderboardsController from './leaderboard.controller.js';
import { restrictToAuthenticatedUser } from '../middleware/auth-middleware.js';


const leaderboardController = new leaderboardsController();

export const leaderboardRouter: Router = express.Router();

leaderboardRouter.get('/daily', restrictToAuthenticatedUser(), leaderboardController.handleDailyLeaderboard.bind(leaderboardController));
leaderboardRouter.get('/weekly', restrictToAuthenticatedUser(), leaderboardController.handleWeeklyLeaderboard.bind(leaderboardController));
leaderboardRouter.get('/global', restrictToAuthenticatedUser(), leaderboardController.handleGlobalLeaderboard.bind(leaderboardController));