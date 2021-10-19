import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Cart } from '../../models/cart';

const Router = express.Router();

Router.get('/api/cart', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts = await Cart.find().populate({
            path: 'product',
            populate: {
                path: 'gallery',
                model: 'Gallery',
            }
        });

        res.status(200).send({
            message: 'Carts received successfully',
            carts,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CartIndexRouter };