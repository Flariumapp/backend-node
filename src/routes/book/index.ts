import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Book } from '../../models/book';

const Router = express.Router();

Router.get('/api/book', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id;
        const bookings = await Book.find({ user: id }).populate('passengers')
            .populate({
                path: 'flight',
                populate: [
                    {
                        path: 'brand',
                        model: 'Company',
                        populate: {
                            path: 'logo',
                            model: 'Gallery',
                        }
                    },
                    {
                        path: 'origin',
                        model: 'Location',
                        populate: {
                            path: 'gallery',
                            model: 'Gallery',
                        }
                    },
                    {
                        path: 'destination',
                        model: 'Location',
                        populate: {
                            path: 'gallery',
                            model: 'Gallery',
                        }
                    },
                ],
            }).sort({ createdAt: -1 });
        
        res.status(200).send({
            message: 'Flight Bookings Received!',
            bookings,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookIndexRouter };