import { Request, Response, NextFunction } from 'express';

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser?.isAdmin) {
        throw new Error("Not Admin!");
    }

    next();
}

export { requireAdmin };