import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { validateRequest } from '../../middlewares/validate-request';
import { Book } from '../../models/book';
import { Flight } from '../../models/flight';
import { Wallet } from '../../models/wallet';
import { MealType } from '../../utility/meal-type';
import { BookValidator } from '../../validators/book/book-validator';
import { ClassType } from '../../utility/class-type';
import { Passenger } from '../../models/passenger';
import { History } from '../../models/history';
import { compare } from 'bcryptjs';

const Router = express.Router();

Router.post('/api/book', requireAuth, BookValidator, validateRequest, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.currentUser?.id as string;
        const { passengers, classType, pin } = req.body;
        const flightId = req.body.flight as string;

        const flight = await Flight.findById(flightId).populate({
            path: 'brand',
            populate: {
                path: 'logo',
                model: 'Gallery',
            }
        })
        .populate({
            path: 'destination',
            populate: {
                path: 'gallery',
                model: 'Gallery',
            }
        })
        .populate({
            path: 'origin',
            populate: {
                path: 'gallery',
                model: 'Gallery',
            }
        });

        if (!flight) {
            throw new Error('Flight not found!');
        }

        let baseFare = flight.baseFare as number;
        let travelClassType = ClassType.Economic;

        if (classType === 'economic') {
            travelClassType = ClassType.Economic;
        } else if (classType === 'premium') {
            travelClassType = ClassType.Premium;
            baseFare *= 1.5;
        } else if (classType === 'business') {
            travelClassType = ClassType.Business;
            baseFare *= 2;
        } else if(classType === 'first') {
            travelClassType = ClassType.First;
            baseFare *= 3;
        }

        let cost = baseFare;

        passengers.map(async (pid: string) => {
            const passenger = await Passenger.findById(pid);
            if (passenger) {
                const meal = passenger.meal;
                if (meal === MealType.Veg) {
                    cost += 150;
                } else if (meal === MealType.NonVeg) {
                    cost += 200;
                } 
            }
        }); 

        const wallet = await Wallet.findOne({ user: id });

        if (!wallet) {
            throw new Error('Wallet not found!');
        }

        const isValidPin = await compare(pin, wallet.pin);

        if (!isValidPin) {
            throw new Error('Invalid Pin!');
        }

        const amount = wallet.amount;

        if (amount < cost) {
            throw new Error('Wallet amount insufficient!');
        }

        const booking = Book.build({
            cost,
            classType: travelClassType,
            passengers,
            flight: flightId,
            user: id,
        });

        await booking.save();

        wallet.set({
            amount: amount - cost,
        });

        await wallet.save();

        const history = History.build({
            amount: cost,
            withdraw: true,
            user: id,
        });

        await history.save();

        res.status(201).send({
            message: 'Flight Bookings Done!',
            booking,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as BookCreateRouter };