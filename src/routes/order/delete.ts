import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models/order';
import { requireAuth } from '../../middlewares/require-auth';

const Router = express.Router();

Router.delete('/api/order/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const { carts, price } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            throw new Error('Order not found!');
        }

        await Order.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Order deleted!',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderDeleteRouter };