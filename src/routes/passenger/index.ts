import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Passenger } from '../../models/passenger';

const Router = express.Router();

Router.get('/api/passenger', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const passengers = await Passenger.find();

        res.status(200).send({
            message: 'Passengers received successfully',
            passengers,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PassengerIndexRouter };