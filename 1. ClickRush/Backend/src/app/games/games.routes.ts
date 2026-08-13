import express from 'express';
import type { Router } from 'express';
import createGameController from './games.controller.js';
import { restrictToAuthenticatedUser } from '../middleware/auth-middleware.js';


const gamesController = new createGameController();

export const gameRouter: Router = express.Router();

gameRouter.post('/', restrictToAuthenticatedUser(), gamesController.handleGameCreation.bind(gamesController));

gameRouter.get('/', restrictToAuthenticatedUser(), gamesController.handleGetGames.bind(gamesController));