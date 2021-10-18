import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Company } from '../../models/company';

const Router = express.Router();

Router.get('/api/company', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companies = await Company.find().populate('logo');

        res.status(200).send({
            message: 'Companies Received',
            companies,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CompanyIndexRouter };