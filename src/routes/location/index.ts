import express, { Request, Response, NextFunction } from 'express';
import { Location } from '../../models/location';

const Router = express.Router();

Router.get('/api/location', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const locations = await Location.find();

        res.status(200).send({
            message: 'Locations Received',
            locations
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LocationIndexRouter };