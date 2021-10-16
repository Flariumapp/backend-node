import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Company } from '../../models/company';

const Router = express.Router();

Router.delete('/api/company/:id', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const company = await Company.findById(id);

        if (!company) {
            throw new Error('Company Not Found!');
        }

        await Company.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Company Deleted',
            company,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CompanyDeleteRouter };