import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import { AuthValidator } from '../../validators/auth/auth-validator';
import { validateRequest } from '../../middlewares/validate-request';

const Router = express.Router();

const randomNum = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

Router.post('/api/auth/signup', AuthValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, password, adminPassKey } = req.body;

        const existingUser = await User.findOne({ email });
    
        if (existingUser) {
            throw new Error("Email address already exists!");
        }
    
        const passwordHash = await bcrypt.hash(password, 12);

        const imageIndex = randomNum(0, 14);

        let isAdmin = false;

        if (adminPassKey && adminPassKey === 'flariumapp247') {
            isAdmin = true;
        }

        const user = User.build({
            firstName, lastName, email, imageIndex, password: passwordHash, isAdmin
        });
    
        await user.save();
    
        const token = jwt.sign({ email, id: user.id, isAdmin }, 'secret', {
            expiresIn: '24h',
        });

        // req.session = {
        //     jwt: token
        // };
    
        const expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;

        res.status(201).send({
            message: 'User signed up successfully',
            token,
            id: user.id,
            expiryDate,
            isAdmin,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as SignupRouter };