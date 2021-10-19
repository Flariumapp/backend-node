import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Cart } from '../../models/cart';

const Router = express.Router();

Router.delete('/api/cart/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const cart = await Cart.findById(id);

        if (!cart) {
            throw new Error('Cart not found!');
        }

        await Cart.findByIdAndDelete(id);

        res.status(201).send({
            message: 'Cart deleted successfully',
            cart,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as CartDeleteRouter };