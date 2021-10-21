import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { History } from '../../models/history';

const Router = express.Router();

Router.delete('/api/history/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const historyItem = await History.findById(id);

        if (!historyItem) {
            throw new Error('History Item not found!');
        }

        await History.findByIdAndDelete(id);

        res.status(202).send({
            message: 'History deleted successfully',
            historyItem,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as HistoryDeleteRouter };