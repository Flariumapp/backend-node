import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Product } from '../../models/product';

const Router = express.Router();

Router.get('/api/product', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        // /api/product?category=food&subCategory=lunch
        const products = await Product.find({ ...req.query }).populate('gallery').sort({ createdAt: -1 });

        res.status(200).send({
            message: 'Products fetched successfully!',
            products,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ProductIndexRouter };