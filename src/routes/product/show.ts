import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';

const Router = express.Router();

Router.get('/api/product/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('gallery');

        res.status(200).send({
            message: 'Product fetched successfully!',
            product,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ProductShowRouter };