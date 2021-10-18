import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Bank } from '../../models/bank';

const Router = express.Router();

Router.delete('/api/bank/:id', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const bank = await Bank.findById(id);

        if (!bank) {
            throw new Error('Bank Not Found!');
        }

        await Bank.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Bank Deleted',
            bank,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BankDeleteRouter };