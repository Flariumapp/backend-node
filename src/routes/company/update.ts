import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Company } from '../../models/company';
import { CompanyValidator } from '../../validators/company/company-validator';

const Router = express.Router();

Router.put('/api/company/:id', requireAuth, requireAdmin, CompanyValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { name, logo } = req.body;
    
        const company = await Company.findById(id);

        if (!company) {
            throw new Error('Company Not Found!');
        }

        company.set({ name, logo });

        await company.save();

        res.status(204).send({
            message: 'Company Updated',
            company,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CompanyUpdateRouter };