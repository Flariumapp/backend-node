import express, { Request, Response, NextFunction } from 'express';
import { requireAuth } from '../../middlewares/require-auth';
import { Passenger } from '../../models/passenger';
import { Flight } from '../../models/flight';
import { MealType } from '../../utility/meal-type';
import { GenderType } from '../../utility/gender-type';

const Router = express.Router();

Router.post('/api/passenger', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstName, lastName, email, age, gender, meal, imageIndex } = req.body;

        const flightId = req.body.flight as string;

        const flight = await Flight.findById(flightId);

        if (!flight) {
            throw new Error('Flight not found!');
        }

        let modifiedMeal = MealType.None;

        if (meal === 'veg') {
            modifiedMeal = MealType.Veg;
        } else if (meal === 'non-veg') {
            modifiedMeal = MealType.NonVeg;
        } else if (meal === 'none') {
            modifiedMeal = MealType.None;
        }

        
        let modifiedGender = GenderType.Male;

        if (gender == 'male') {
            modifiedGender = GenderType.Male; 
        } else if (gender == 'female') {
            modifiedGender = GenderType.Female;
        } else {
            modifiedGender = GenderType.Other;
        }


        const passenger = Passenger.build({
            firstName, lastName, email, age, gender: modifiedGender, imageIndex, meal: modifiedMeal, flight: flightId,
        });

        await passenger.save();

        res.status(201).send({
            message: 'Passenger created successfully',
            passenger,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as PassengerCreateRouter };