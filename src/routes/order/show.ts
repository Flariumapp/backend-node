import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models/order';
import { requireAuth } from '../../middlewares/require-auth';

const Router = express.Router();

Router.get('/api/order/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const existingOrder = await Order.findById(id);

        if (!existingOrder || existingOrder.user !== req.currentUser?.id) {
            throw new Error('Order not found!');
        }

        const order = await Order.findById(id).populate({
            path: 'carts',
            populate: {
                path: 'product',
                model: 'Product',
                populate: {
                    path: 'gallery',
                    model: 'Gallery',
                }
            }
        });

        res.status(200).send({
            message: 'Order received.',
            order,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderShowRouter };