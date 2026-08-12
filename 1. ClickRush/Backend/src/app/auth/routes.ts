import express from 'express';
import type { Router  } from 'express';
import AuthenticationController from './controller.js';
import { restrictToAuthenticatedUser } from '../middleware/auth-middleware.js';

const authController = new AuthenticationController();


export const authRouter: Router = express.Router();

authRouter.post('/signup', authController.handleSignup.bind(authController));
authRouter.post('/signin', authController.handleSignin.bind(authController));

authRouter.get('/me', restrictToAuthenticatedUser(), authController.handleMe.bind(authController))
