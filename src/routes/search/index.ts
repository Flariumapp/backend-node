import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Location } from '../../models/location';
import { Company } from '../../models/company';
import Fuse from 'fuse.js';

const Router = express.Router();

Router.get('/api/search', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // api/search/?type=location&input=text
        const type = req.query.type as string;
        const input = req.query.input as string;

        if (type === 'location') {
            const locations = await Location.find().populate('gallery');
    
            const fuse = new Fuse(locations, {
                includeScore: true,
                keys: ['name', 'country'],
            });
    
            const results = fuse.search(input);
    
            res.status(200).send({
                message: 'Search results fetched succesfully',
                results,
            });
        } else {
            const companies = await Company.find().populate('logo');

            const fuse = new Fuse(companies, {
                includeScore: true,
                keys: ['name']
            });

            const results = fuse.search(input);
    
            res.status(200).send({
                message: 'Search results fetched succesfully',
                results,
            });
        }
    } catch (err) {
        next(err);
    }
});

export { Router as SearchIndexRouter };