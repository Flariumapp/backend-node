import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Book } from '../../models/book';

const Router = express.Router();

Router.get('/api/book/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const booking = await Book.findById(id);
        
        res.status(200).send({
            message: 'Flight Booking Received!',
            booking,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookShowRouter };