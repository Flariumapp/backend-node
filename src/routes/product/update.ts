import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Product } from '../../models/product';
import { ProductCategory } from '../../utility/product-category';
import { ProductValidator } from '../../validators/product/product-validator';

const Router = express.Router();

Router.put('/api/product/:id', requireAuth, requireAdmin, ProductValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const { name, category, price, gallery, subCategory, meta } = req.body;

        const product = await Product.findById(id);

        if (!product) {
            throw new Error('Product not found!');
        }

        let modifiedCategory = ProductCategory.Food;

        switch (category) {
            case 'food':
                modifiedCategory = ProductCategory.Food;
                break;
            case 'cloth':
                modifiedCategory = ProductCategory.Cloth;
                break;
            default:
                modifiedCategory = ProductCategory.Food;
                break;
        }

        product.set({
            name,
            category: modifiedCategory,
            price,
            gallery,
            subCategory,
            meta,
        });

        await product.save();

        res.status(204).send({
            message: 'Product updated successfully!',
            product,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ProductUpdateRouter };