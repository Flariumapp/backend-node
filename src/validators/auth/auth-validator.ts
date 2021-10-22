import { body } from 'express-validator';

const validator = [
    body('email')
        .isEmail()
        .withMessage('Invalid email address'),
    body('password')
        .isLength({ min: 7 })
        .withMessage('Password length must be atleast 8'),
];

export { validator as AuthValidator };