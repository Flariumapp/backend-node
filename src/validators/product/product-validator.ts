import { body } from 'express-validator';

const validator = [
    body('name')
        .notEmpty()
        .withMessage('Product Name must be provided!'),
    body('category')
        .notEmpty()
        .withMessage('Product category must be provided!'),
    body('price')
        .notEmpty()
        .withMessage('Price must be provided!')
        .isNumeric()
        .withMessage('Price must be a number.'),
];

export { validator as ProductValidator }