import { body } from 'express-validator';

const validator = [
    body('name')
        .isEmpty()
        .withMessage('Location name should not be empty'),
    body('country')
        .isEmpty()
        .withMessage('Location country must be provided'),
];

export { validator as LocationValidator };