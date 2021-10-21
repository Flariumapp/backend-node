import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Passenger } from '../../models/passenger';

const Router = express.Router();

Router.delete('/api/passenger/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string;
        const passenger = await Passenger.findById(id);

        if (!passenger) {
            throw new Error('Passenger not found!');
        }

        await Passenger.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Passenger deleted successfully',
            passenger,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PassengerDeleteRouter };