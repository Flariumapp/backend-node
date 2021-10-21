import express, { Request, Response, NextFunction } from 'express';
import { Flight } from '../../models/flight';

const Router = express.Router();

Router.get('/api/flight/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const flight = await Flight.findById(id)
            .populate({
                path: 'brand',
                populate: {
                    path: 'logo',
                    model: 'Gallery',
                }
            })
            .populate({
                path: 'destination',
                populate: {
                    path: 'gallery',
                    model: 'Gallery',
                }
            })
            .populate({
                path: 'origin',
                populate: {
                    path: 'gallery',
                    model: 'Gallery',
                }
            });

        if (!flight) {
            throw new Error('Flight Not Found!');
        }
            
        res.status(200).send({
            message: 'Flight Received',
            flight,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FlightShowRouter };