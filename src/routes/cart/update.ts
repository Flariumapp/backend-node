import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Cart } from '../../models/cart';
import { CartValidator } from '../../validators/cart/cart-validator';

const Router = express.Router();

Router.put('/api/cart/:id', requireAuth, CartValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const { product, quantity } = req.body;

        const cart = await Cart.findById(id);

        if (!cart) {
            throw new Error('Cart not found1');
        }

        cart.set({
            product,
            quantity,
        });

        await cart.save();

        const cartItem = await Cart.findById(id).populate({
            path: 'product',
            populate: {
                path: 'gallery',
                model: 'Gallery',
            }
        });

        res.status(201).send({
            message: 'Cart updated successfully',
            cart: cartItem,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CartUpdateRouter };