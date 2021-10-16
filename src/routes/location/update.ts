import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Location } from '../../models/location';
import { LocationValidator } from '../../validators/location/location-validator';

const Router = express.Router();

Router.put('/api/location/:id', requireAuth, requireAdmin, LocationValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { name, gallery, country, description } = req.body;
    
        const location = await Location.findById(id);

        if (!location) {
            throw new Error('Location Not Found!');
        }

        location.set({
            name, gallery, country, description
        });

        await location.save();

        res.status(204).send({
            message: 'Location Updated',
            location,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LocationUpdateRouter };