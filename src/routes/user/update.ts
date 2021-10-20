import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';
import { PasswordValidator } from '../../validators/password/password-validator';
import { validateRequest } from '../../middlewares/validate-request';

const Router = express.Router();

Router.put('/api/user/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
            throw new Error('No such user exists!');
        }
    
        const { userName, name, email, age } = req.body;

        user.set({
            userName, name, email, imageIndex: user.imageIndex, age
        });
    
        await user.save();
    
        res.status(204).send({
            message: 'user updated successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

Router.put('/api/update-password/:id', requireAuth, PasswordValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
    
        if (!user) {
            throw new Error('No such user exists!');
        }
    
        const { oldPassword, newPassword } = req.body;

        const isValid = await bcrypt.compare(oldPassword, user.password);

        if (!isValid) {
            throw new Error('Incorrect old password!');
        }

        const hash = await bcrypt.hash(newPassword, 12);

        user.set({
            password: hash,
        });
    
        await user.save();
    
        res.status(204).send({
            message: 'user password updated successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

Router.put('/api/update-profile', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id;
        const user = await User.findById(id);

        const { imageIndex } = req.body;
    
        if (!user) {
            throw new Error('No such user exists!');
        }

        user.set({
            imageIndex
        });
    
        await user.save();
    
        res.status(204).send({
            message: 'user profile image updated successfully',
            user,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as UserUpdateRouter };


// Hello, This is Manas Kumar from Gurugram, Haryana. Currently pursuing computer engineering from Delhi Technological University(DTU) in New Delhi.