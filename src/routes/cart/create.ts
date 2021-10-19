import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Cart } from '../../models/cart';
import { CartValidator } from '../../validators/cart/cart-validator';

const Router = express.Router();

Router.post('/api/cart', requireAuth, CartValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product, quantity } = req.body;

        const cart = Cart.build({
            product, quantity
        });

        await cart.save();

        const cartItem = await Cart.findById(cart.id).populate({
            path: 'product',
            populate: {
                path: 'gallery',
                model: 'Gallery',
            }
        });

        res.status(201).send({
            message: 'Cart created successfully',
            cart: cartItem,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CartCreateRouter };