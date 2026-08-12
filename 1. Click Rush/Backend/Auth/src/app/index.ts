import express from 'express';
import type { Express } from 'express';
import { authRouter } from './auth/routes.js';
import { authMiddleware } from './middleware/auth-middleware.js';

export function createApplication() : Express {
    const app = express();

    //middlewares 
    app.use(express.json());
    app.use(authMiddleware());




    //Routes
    app.get('/', (req, res) => {
        return res.json({message: "Hello from the ChaiCode Auth Service"});
    })

    app.use('/auth', authRouter);



    return app;
}