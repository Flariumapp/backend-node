import { body } from 'express-validator';

const validator = [
    body('flight')
        .notEmpty()
        .withMessage('Flight ID must be provided'),
];

export { validator as BookValidator };