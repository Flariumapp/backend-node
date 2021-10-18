import { body } from 'express-validator';

const validator = [
    body('name')
        .isLength({ min: 2 })
        .withMessage('Company name must be present (atleast 2 characters)'),
    body('logo')
        .notEmpty()
        .withMessage('Logo must be provided for a company'),
];

export { validator as BankValidator };