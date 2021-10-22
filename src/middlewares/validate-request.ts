import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult, Result } from 'express-validator';

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req) as Result<ValidationError>;

    if (!errors.isEmpty()) {
        const error = errors.array()[0];
        throw new Error(error.msg);
    }

    next();
}

export { validateRequest };