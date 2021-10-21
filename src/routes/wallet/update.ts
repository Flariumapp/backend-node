import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Wallet } from '../../models/wallet';
import bcrypt from 'bcryptjs';
import { History } from '../../models/history';
import { WalletValidator } from '../../validators/wallet/wallet-validator';
import { validateRequest } from '../../middlewares/validate-request';

const Router = express.Router();

Router.put('/api/wallet', requireAuth, WalletValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;

        const { amount, withdraw, pin } = req.body;

        const wallet = await Wallet.findOne({ user: id });

        if (!wallet) {
            throw new Error('Wallet not found!');
        }

        const isValidPin = await bcrypt.compare(pin, wallet.pin);

        if (!isValidPin) {
            throw new Error('Invalid pin!');
        }
        
        if (withdraw) {
            if (wallet.amount < amount) {
                throw new Error('Insufficient amount!');
            } else {
                const newAmount = wallet.amount - amount;
                wallet.set({
                    amount: newAmount,
                });
            }
        } else {
            const newAmount = wallet.amount + amount;
            wallet.set({
                amount: newAmount,
            });
        }

        await wallet.save();

        const history = History.build({
            amount,
            withdraw,
            user: id,
        });

        await history.save();

        res.status(204).send({
            message: 'Wallets updated successfully',
            wallet,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as WalletUpdateRouter };