import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Bank } from '../../models/bank';
import { BankValidator } from '../../validators/bank/bank-validator';

const Router = express.Router();

Router.put('/api/bank/:id', requireAuth, requireAdmin, BankValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { name, logo } = req.body;
    
        const bank = await Bank.findById(id);

        if (!bank) {
            throw new Error('Bank Not Found!');
        }

        bank.set({ name, logo });

        await bank.save();

        res.status(204).send({
            message: 'Company Updated',
            bank,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BankUpdateRouter };