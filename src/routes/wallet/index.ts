import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { Wallet } from '../../models/wallet';

const Router = express.Router();

Router.get('/api/wallet', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wallets = await Wallet.find().populate('user');

        res.status(200).send({
            message: 'Wallets received successfully',
            wallets,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as WalletIndexRouter };