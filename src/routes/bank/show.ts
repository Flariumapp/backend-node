import express, { Request, Response, NextFunction } from 'express';
import { Bank } from '../../models/bank';

const Router = express.Router();

Router.get('/api/bank/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const bank = await Bank.findById(id).populate('logo');

        if (!bank) {
            throw new Error('Bank Not Found!');
        }

        res.status(200).send({
            message: 'Bank Received',
            bank,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BankShowRouter };