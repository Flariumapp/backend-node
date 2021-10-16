import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Flight } from '../../models/flight';
import { FlightValidator } from '../../validators/flight/flight-validator';

const Router = express.Router();

Router.put('/api/flight/:id', requireAuth, requireAdmin, FlightValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const { flightNo, brand, origin, destination, time, gateNo, terminal } = req.body;

        const flight = await Flight.findById(id);

        if (!flight) {
            throw new Error('Flight Not Found!');
        }
    
        flight.set({
            flightNo,
            brand,
            origin,
            destination,
            time,
            gateNo,
            terminal,
            status: 'scheduled',
        });
    
        await flight.save();
    
        res.status(204).send({
            message: 'Flight Updated',
            flight,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FlightUpdateRouter };