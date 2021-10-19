import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Cart } from '../../models/cart';

const Router = express.Router();

Router.get('/api/cart/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const cart = await Cart.findById(id).populate({
            path: 'product',
            populate: {
                path: 'gallery',
                model: 'Gallery',
            }
        });

        if (!cart) {
            throw new Error('Cart not found!');
        }

        res.status(200).send({
            message: 'Carts received successfully',
            cart,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CartShowRouter };