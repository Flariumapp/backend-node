import { body } from 'express-validator';

const validator = [
    body('product')
        .notEmpty()
        .withMessage('Product must be provided!'),
    body('quantity')
        .notEmpty()
        .withMessage('Quantity must be provided!')
        .isNumeric()
        .withMessage('Quantity must be a number.'),
];

export { validator as CartValidator }