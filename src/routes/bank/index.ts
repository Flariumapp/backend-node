import express, { Request, Response, NextFunction } from 'express';
import { Bank } from '../../models/bank';

const Router = express.Router();

Router.get('/api/bank', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const banks = await Bank.find().populate('logo');

        res.status(200).send({
            message: 'Banks Received',
            banks,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BankIndexRouter };