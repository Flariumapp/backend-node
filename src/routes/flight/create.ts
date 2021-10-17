import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Flight } from '../../models/flight';
import { FlightValidator } from '../../validators/flight/flight-validator';

const Router = express.Router();

Router.post('/api/flight', requireAuth, requireAdmin, FlightValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { flightNo, brand, origin, destination, arrival, departure, gateNo, terminal, baseFare } = req.body;
    
        const flight = Flight.build({
            flightNo,
            brand,
            origin,
            destination,
            arrival,
            departure,
            gateNo,
            terminal,
            status: 'scheduled',
            baseFare,
        });
    
        await flight.save();
    
        res.status(201).send({
            message: 'Flight Created',
            flight,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FlightCreateRouter };