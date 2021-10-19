import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';

const Router = express.Router();

Router.delete('/api/product/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            throw new Error('Product not found!');
        }

        await Product.findByIdAndDelete(id);

        res.status(202).send({
            message: 'Product deleted successfully!',
            product,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ProductDeleteRouter };