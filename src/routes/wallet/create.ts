import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Wallet } from '../../models/wallet';
import bcrypt from 'bcryptjs';
import { WalletValidator } from '../../validators/wallet/wallet-validator';

const Router = express.Router();

Router.post('/api/wallet', requireAuth, WalletValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;
        const { amount, pin } = req.body;

        const hashedPin = await bcrypt.hash(pin, 6);
        
        const wallet = Wallet.build({
            amount: amount as number,
            pin: hashedPin,
            user: id,
        });

        wallet.save();

        res.status(201).send({
            message: 'Wallet created successfully',
            wallet,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as WalletCreateRouter };