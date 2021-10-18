import express, { Request, Response, NextFunction } from 'express';
import { Flight } from '../../models/flight';

const Router = express.Router();

interface FlightQuery {
    origin: string | undefined;
    destination: string | undefined;
    departure: string | undefined;
};

Router.get('/api/flight', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // /api/flight?origin=hohoqefoiq23&destination=foheoo2i323&departure='.....Z'
        const query = req.query;

        const flights = await Flight.find({ ...query })
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
            
        res.status(200).send({
            message: 'Flights Received',
            flights,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as FlightIndexRouter };