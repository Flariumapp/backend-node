import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models/order';
import { requireAuth } from '../../middlewares/require-auth';
import { compare } from 'bcryptjs';
import { Wallet } from '../../models/wallet';
import { History } from '../../models/history';

const Router = express.Router();

Router.post('/api/order', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;
        const { carts, price, pin } = req.body;

        const wallet = await Wallet.findOne({ user: id });

        if (!wallet) {
            throw new Error('Wallet not found!');
        }

        const isValidPin = await compare(pin, wallet.pin);

        if (!isValidPin) {
            throw new Error('Invalid pin!');
        }

        const amount = wallet.amount;

        if (amount < price) {
            throw new Error('Wallet amount insufficient!');
        }

        const order = Order.build({
            carts, price, user: req.currentUser?.id as string,
        });

        await order.save();


        wallet.set({
            amount: amount - price,
        });

        await wallet.save();

        const history = History.build({
            amount: price,
            withdraw: true,
            user: id,
        });

        await history.save();

        res.status(201).send({
            message: 'Order created!',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderCreateRouter };