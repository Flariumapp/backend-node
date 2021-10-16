import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Location } from '../../models/location';

const Router = express.Router();

Router.get('/api/location/:id', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const location = await Location.findById(id);

        if (!location) {
            throw new Error('Location Not Found!');
        }

        res.status(200).send({
            message: 'Location Received',
            location,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LocationShowRouter };