import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Book } from '../../models/book';
import { Wallet } from '../../models/wallet';

const Router = express.Router();

Router.delete('/api/book/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const booking = await Book.findById(id);

        if (!booking) {
            throw new Error('Booking not found!');
        }

        await Book.findByIdAndDelete(id);

        const wallet = await Wallet.findOne({ user: req.currentUser?.id });

        if (!wallet) {
            throw new Error('Wallet not found!');
        }

        const amount = wallet.amount;

        wallet.set({
            amount: amount + booking.cost
        });

        await wallet.save();
        
        res.status(202).send({
            message: 'Flight Booking Cancelled!',
            booking,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookDeleteRouter };