import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Company } from '../../models/company';
import { CompanyValidator } from '../../validators/company/company-validator';

const Router = express.Router();

Router.post('/api/company', requireAuth, requireAdmin, CompanyValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, logo } = req.body;
    
        const company = Company.build({ name, logo });
        await company.save();

        res.status(201).send({
            message: 'Company Created',
            company,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CompanyCreateRouter };