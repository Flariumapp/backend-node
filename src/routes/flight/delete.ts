import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Flight } from '../../models/flight';

const Router = express.Router();

Router.delete('/api/flight/:id', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        
        const flight = await Flight.findById(id);

        if (!flight) {
            throw new Error('Flight Not Found!');
        }

        await Flight.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Flight Deleted',
            flight,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FlightDeleteRouter };