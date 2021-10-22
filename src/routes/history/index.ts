import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { History } from '../../models/history';

const Router = express.Router();

Router.get('/api/history', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;

        const history = await History.find({ user: id }).populate('user').sort({ createdAt: -1 });

        res.status(200).send({
            message: 'History received successfully',
            history,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as HistoryIndexRouter };