import express from 'express';
import type { Express } from 'express';
import { authRouter } from './auth/routes.js';
import { authMiddleware } from './middleware/auth-middleware.js';
import { gameRouter } from './games/games.routes.js';

export function createApplication() : Express {
    const app = express();

    //middlewares 
    app.use(express.json());
    app.use(authMiddleware());


    //Routes
    app.get('/', (req, res) => {
        return res.json({message: "Hello from the ClickRush Game"});
    })

    app.use('/auth', authRouter);
    app.use('/games', gameRouter);



    return app;
}