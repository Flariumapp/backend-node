import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
    isAdmin: string;
};

interface OpTokenPayload {
    jwt: string;
    user: object;
    accessToken: string;
};

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    // let token = null;
    // if (req.session) {
    //     console.log('session', req.session);
    // }

    // if (req.headers && req.headers.cookie) {
    //     token = req.headers.cookie.split('; ')[2].replace('next-auth.session-token=', '');
    //     console.log(token);
    // }

    // console.log('cookies', req.cookies);
    // console.log('signed cookies', req.signedCookies);

    // if (!req.session?.jwt) {
    //     return next();
    // }

    try {
        const authHeader = req.get('Authorization');
    
        if (!authHeader) {
            return next();
        }
    
        const token = authHeader.split(' ')[1];
    
        const decodedToken = jwt.verify(token, 'secret') as UserPayload;
    
        if (!decodedToken) {
            return next();
        }
        // const opPayload = jwt.verify(token, 'secret') as OpTokenPayload;

        // console.log('opPayload', opPayload);

        // const payload = jwt.verify(decodedToken, 'secret') as UserPayload;
        req.currentUser = decodedToken;
    } catch (err) {
        console.log('token error', err);
    }

    next();
}

export { currentUser };