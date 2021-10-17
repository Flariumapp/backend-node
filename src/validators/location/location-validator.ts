import { body } from 'express-validator';

const validator = [
    body('name')
        .notEmpty()
        .withMessage('Location name should not be empty'),
    body('country')
        .notEmpty()
        .withMessage('Location country must be provided'),
];

export { validator as LocationValidator };