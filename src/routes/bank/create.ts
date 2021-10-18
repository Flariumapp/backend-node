import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Bank } from '../../models/bank';
import { BankValidator } from '../../validators/bank/bank-validator';

const Router = express.Router();

Router.post('/api/bank', requireAuth, requireAdmin, BankValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, logo } = req.body;
    
        const bank = Bank.build({ name, logo });
        await bank.save();

        res.status(201).send({
            message: 'Bank Created',
            bank,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BankCreateRouter };