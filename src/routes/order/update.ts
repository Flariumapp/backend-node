import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models/order';
import { requireAuth } from '../../middlewares/require-auth';

const Router = express.Router();

Router.put('/api/order/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { carts, price } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            throw new Error('Order not found!');
        }

        order.set({
            carts,
            price,
        });

        await order.save();

        res.status(204).send({
            message: 'Order updated!',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderUpdateRouter };