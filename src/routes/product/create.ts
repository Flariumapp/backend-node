import express, { Request, Response, NextFunction } from 'express';
import { requireAdmin } from '../../middlewares/require-admin';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Product } from '../../models/product';
import { ProductCategory } from '../../utility/product-category';
import { ProductValidator } from '../../validators/product/product-validator';

const Router = express.Router();

Router.post('/api/product', requireAuth, requireAdmin, ProductValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, category, price, gallery, subCategory, meta } = req.body;

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

        const product = Product.build({
            name,
            category: modifiedCategory,
            price,
            gallery,
            subCategory,
            meta,
        });

        await product.save();

        res.status(201).send({
            message: 'Product created successfully!',
            product,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as ProductCreateRouter };