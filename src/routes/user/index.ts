import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { User } from '../../models/user';

const Router = express.Router();

Router.get('/api/user', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const page : number = parseInt(req.query.page as string);
    const perPage : number = 10;
    const offset : number = (page - 1) * perPage;

    const users = await User.find({ _id: { $ne: req.currentUser?.id } }).skip(offset).limit(perPage);

    res.status(200).send({
        message: 'users fetched successfully',
        users,
    });
});

export { Router as UserIndexRouter };