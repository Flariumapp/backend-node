import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Wallet } from '../../models/wallet';
import bcrypt from 'bcryptjs';

const Router = express.Router();

Router.get('/api/my-wallet', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;

        const wallet = await Wallet.findOne({ user: id });

        res.status(200).send({
            message: 'Wallets received successfully',
            wallet,
        });
    } catch (err) {
        next(err);
    }
});


Router.post('/api/my-wallet', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;

        const { pin } = req.body;

        const wallet = await Wallet.findOne({ user: id });

        if (!wallet) {
            throw new Error('Wallet not found!');
        }
  
        const isValidPin = await bcrypt.compare(pin, wallet.pin);

        if (!isValidPin) {
            throw new Error('Invalid Pin!');
        }

        res.status(201).send({
            message: 'Wallets received successfully',
            wallet,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as WalletShowRouter };