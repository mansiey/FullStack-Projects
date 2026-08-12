import type { Request, Response } from 'express';
import { signinPayloadModel, signupPayloadModel } from './model.js';
import { db } from '../../db/index.js';
import { usersTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { createHmac, randomBytes } from 'node:crypto';
import { createUserToken } from './utils/tokens.js';



class AuthenticationController {
    public async handleSignup(req:Request, res: Response) {
        const validationResult = await signupPayloadModel.safeParseAsync(req.body);
        if(validationResult.error){
            return res.status(400).json({
                message: "Body validation failed",
                error: validationResult.error.issues,
            });
        }

        const { firstName, lastName, email, password } = validationResult.data;

        //check if the user email already exists in the db
        const userEmail = await db.select().from(usersTable).where(eq(usersTable.email, email));   //return array of detail of the user

        if(userEmail.length > 0) {
            return res.status(401).json({
                error: "Duplicate entry",
                message: `User with email ${email} already exists!`
            })
        }

        //if user doesn't exist, create user
        const salt = randomBytes(32).toString('hex');
        const hash = createHmac('sha256', salt).update(password).digest('hex');

        const [result] = await db.insert(usersTable).values({
            firstName,
            lastName,
            email,
            password: hash,
            salt
        }).returning({id: usersTable.id});

        return res.status(201).json({
            message: 'User is successfully created',
            data: {id: result?.id}
        })

    }

    public async handleSignin(req: Request, res: Response){
        const validationResult = await signinPayloadModel.safeParseAsync(req.body);

        if(validationResult.error){
            return res.status(400).json({
                message: "Body Validiation failed",
                error: validationResult.error.issues,
            })
        }
        
        const { email, password } = validationResult.data;
        const [userResult] = await db.select().from(usersTable).where(eq(usersTable.email, email));
        if(!userResult){
            return res.status(404).json({
                message: `User with email ${email} does not exist!`
            })
        }
        
        //if user found hash the password and match from db
        const existingSalt =  userResult.salt!;
        const hash = createHmac('sha256', existingSalt).update(password).digest('hex');

        if(userResult.password !== hash){
            return res.status(400).json({
                message: `Invalid email or password`,
            })
        }

        //TODO : token banao : done
        const token = createUserToken({ id: userResult.id });

        return res.json({
            message: 'Signin Success',
            data: { token },
        })
    }

    public async handleMe(req: Request, res: Response){
        //@ts-ignore
        const { id } = req.user! as userTokenPayload;

        const [userResult] = await db.select().from(usersTable).where(eq(usersTable.id, id));

        return res.status(200).json({
            firstName: userResult?.firstName,
            lastName: userResult?.lastName,
            email: userResult?.email
        })
    }
}

export default AuthenticationController;