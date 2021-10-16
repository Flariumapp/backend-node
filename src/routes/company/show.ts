import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Company } from '../../models/company';

const Router = express.Router();

Router.get('/api/company/:id', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const company = await Company.findById(id).populate('logo');

        if (!company) {
            throw new Error('Company Not Found!');
        }

        res.status(200).send({
            message: 'Company Received',
            company,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CompanyShowRouter };