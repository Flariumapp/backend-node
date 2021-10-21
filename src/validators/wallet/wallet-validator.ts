import { body } from 'express-validator';

const validator = [
    body('pin')
        .notEmpty()
        .withMessage('Pin must be provided!')
        .isLength({ min: 4, max: 4 })
        .withMessage('Pin must be of exactly 4 characters'),
    body('amount')
        .notEmpty()
        .withMessage('Amount must be provided!')
        .isFloat({ min: 1, max: 1000 })
        .withMessage('Amount must be a number between 1 and 1000 inclusive'),
];

export { validator as WalletValidator };