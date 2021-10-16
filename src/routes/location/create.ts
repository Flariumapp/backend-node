import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Location } from '../../models/location';
import { LocationValidator } from '../../validators/location/location-validator';

const Router = express.Router();

Router.post('/api/location', requireAuth, requireAdmin, LocationValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, gallery, country, description } = req.body;
    
        const location = Location.build({
            name,
            gallery,
            country,
            description
        });

        await location.save();

        res.status(201).send({
            message: 'Location Created',
            location,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as LocationCreateRouter };