import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Wallet } from '../../models/wallet';
import bcrypt from 'bcryptjs';

const Router = express.Router();

Router.delete('/api/wallet', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;

        const wallet = await Wallet.findOne({ user: id });

        if (!wallet) {
            throw new Error('Wallet not found!');
        }

        await Wallet.findOneAndDelete({ user: id });

        res.status(202).send({
            message: 'Wallets deleted successfully',
            wallet,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as WalletDeleteRouter };