import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models/order';
import { requireAuth } from '../../middlewares/require-auth';

const Router = express.Router();

Router.post('/api/order', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { carts, price } = req.body;

        const order = Order.build({
            carts, price, user: req.currentUser?.id as string,
        });

        await order.save();

        res.status(201).send({
            message: 'Order created!',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderCreateRouter };