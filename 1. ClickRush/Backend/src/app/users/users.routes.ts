import express  from "express";
import type { Router } from "express";
import usersController from "./users.controller.js";
import { restrictToAuthenticatedUser } from "../middleware/auth-middleware.js";

const userController = new usersController();

export const userRouter: Router = express.Router();

userRouter.get(
    '/profile',
    restrictToAuthenticatedUser(),
    userController.handleUpdateProfile.bind(userController)
);

userRouter.patch(
    '/profile',
    restrictToAuthenticatedUser(),
    userController.handleUpdateProfile.bind(userController)
);

