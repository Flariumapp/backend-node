import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Book } from '../../models/book';

const Router = express.Router();

Router.get('/api/book', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id;
        const bookings = await Book.find({ user: id });
        
        res.status(200).send({
            message: 'Flight Bookings Received!',
            bookings,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookIndexRouter };