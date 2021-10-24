import express, { Request, Response, NextFunction } from 'express';

const Router = express.Router();

Router.post('/api/auth/logout', (req: Request, res: Response, next: NextFunction) => {
    // req.session = null;
    res.send({
        message: 'User logged out successfully',
    });
});

export { Router as LogoutRouter };