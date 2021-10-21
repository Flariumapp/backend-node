import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Passenger } from '../../models/passenger';

const Router = express.Router();

Router.get('/api/passenger/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const passenger = await Passenger.findById(id);

        res.status(200).send({
            message: 'Passenger received successfully',
            passenger,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PassengerShowRouter };