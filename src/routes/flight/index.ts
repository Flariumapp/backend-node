import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Flight } from '../../models/flight';

const Router = express.Router();

Router.get('/api/flight', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const flights = await Flight.find().populate('brand').populate('origin').populate('destination');
            
        res.status(200).send({
            message: 'Flights Received',
            flights,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FlightIndexRouter };