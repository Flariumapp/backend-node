import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../../models/order';
import { requireAuth } from '../../middlewares/require-auth';

const Router = express.Router();

Router.get('/api/order', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await Order.find({ user: req.currentUser?.id }).populate({
            path: 'carts',
            populate: {
                path: 'product',
                // model: 'Product',
                populate: {
                    path: 'gallery',
                    // model: 'Gallery',
                }
            },
        }).sort({ createdAt: -1 });

        res.status(200).send({
            message: 'Orders received.',
            orders,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as OrderIndexRouter };