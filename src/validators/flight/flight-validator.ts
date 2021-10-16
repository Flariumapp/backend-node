import { body } from 'express-validator';

const validator = [
    body('flightNo')
        .isAlphanumeric()
        .withMessage('flightNo must be alpha-numeric')
        .isLength({ max: 5, min: 5 })
        .withMessage('flightNo length must be 5')
        .isUppercase()
        .withMessage('flightNo must have all characters in uppercase'),
];

export { validator as FlightValidator };