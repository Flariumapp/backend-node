import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { json } from 'body-parser';
// import proxy from 'express-http-proxy';
import express, { Request, Response, NextFunction } from 'express';
// import cookieParser from 'cookie-parser';
// import cookieSession from 'cookie-session';
import multer, { FileFilterCallback } from 'multer';
import { currentUser } from './src/middlewares/current-user';
import { SignupRouter } from './src/routes/auth/signup';
import { LoginRouter } from './src/routes/auth/login';
import { FlightCreateRouter } from './src/routes/flight/create';
import { FlightIndexRouter } from './src/routes/flight';
import { FlightShowRouter } from './src/routes/flight/show';
import { FlightDeleteRouter } from './src/routes/flight/delete';
import { FlightUpdateRouter } from './src/routes/flight/update';
import { GalleryCreateRouter } from './src/routes/gallery/create';
import { GalleryIndexRouter } from './src/routes/gallery';
import { GalleryShowRouter } from './src/routes/gallery/show';
import { GalleryDeleteRouter } from './src/routes/gallery/delete';
import { GalleryUpdateRouter } from './src/routes/gallery/update';
import { CompanyCreateRouter } from './src/routes/company/create';
import { CompanyIndexRouter } from './src/routes/company';
import { CompanyShowRouter } from './src/routes/company/show';
import { CompanyDeleteRouter } from './src/routes/company/delete';
import { CompanyUpdateRouter } from './src/routes/company/update';
import { LocationCreateRouter } from './src/routes/location/create';
import { LocationIndexRouter } from './src/routes/location';
import { LocationShowRouter } from './src/routes/location/show';
import { LocationUpdateRouter } from './src/routes/location/update';
import { LocationDeleteRouter } from './src/routes/location/delete';
import { UserShowRouter } from './src/routes/user/show';
import { UserUpdateRouter } from './src/routes/user/update';
import { UserIndexRouter } from './src/routes/user';
import { UserDeleteRouter } from './src/routes/user/delete';
import { LogoutRouter } from './src/routes/auth/logout';
import { SearchIndexRouter } from './src/routes/search';
import { BankIndexRouter } from './src/routes/bank';
import { BankCreateRouter } from './src/routes/bank/create';
import { BankShowRouter } from './src/routes/bank/show';
import { BankUpdateRouter } from './src/routes/bank/update';
import { BankDeleteRouter } from './src/routes/bank/delete';
import { ProductIndexRouter } from './src/routes/product';
import { ProductShowRouter } from './src/routes/product/show';
import { ProductCreateRouter } from './src/routes/product/create';
import { ProductUpdateRouter } from './src/routes/product/update';
import { ProductDeleteRouter } from './src/routes/product/delete';
import { CartIndexRouter } from './src/routes/cart';
import { CartShowRouter } from './src/routes/cart/show';
import { CartCreateRouter } from './src/routes/cart/create';
import { CartUpdateRouter } from './src/routes/cart/update';
import { CartDeleteRouter } from './src/routes/cart/delete';
import { OrderIndexRouter } from './src/routes/order';
import { OrderShowRouter } from './src/routes/order/show';
import { OrderCreateRouter } from './src/routes/order/create';
import { OrderUpdateRouter } from './src/routes/order/update';
import { OrderDeleteRouter } from './src/routes/order/delete';
import { WalletCreateRouter } from './src/routes/wallet/create';
import { WalletIndexRouter } from './src/routes/wallet';
import { WalletShowRouter } from './src/routes/wallet/show';
import { WalletUpdateRouter } from './src/routes/wallet/update';
import { WalletDeleteRouter } from './src/routes/wallet/delete';
import { HistoryIndexRouter } from './src/routes/history';
import { HistoryShowRouter } from './src/routes/history/show';
import { HistoryDeleteRouter } from './src/routes/history/delete';
import { BookIndexRouter } from './src/routes/book';
import { BookShowRouter } from './src/routes/book/show';
import { BookCreateRouter } from './src/routes/book/create';
import { BookDeleteRouter } from './src/routes/book/delete';
import { PassengerIndexRouter } from './src/routes/passenger';
import { PassengerShowRouter } from './src/routes/passenger/show';
import { PassengerCreateRouter } from './src/routes/passenger/create';
import { PassengerDeleteRouter } from './src/routes/passenger/delete';

const app = express();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        } else if(file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({storage: storage, fileFilter: fileFilter}).any());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/videos', express.static(path.join(__dirname, 'videos')));

app.set('trust proxy', true);

app.use(json());
// app.use(cookieSession({
//     signed: false,
//     secure: false,
// }));
// app.use(cookieParser());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(currentUser);

app.use(SignupRouter);
app.use(LoginRouter);
app.use(LogoutRouter);
app.use(FlightCreateRouter);
app.use(FlightIndexRouter);
app.use(FlightShowRouter);
app.use(FlightDeleteRouter);
app.use(FlightUpdateRouter);
app.use(GalleryCreateRouter);
app.use(GalleryIndexRouter);
app.use(GalleryShowRouter);
app.use(GalleryDeleteRouter);
app.use(GalleryUpdateRouter);
app.use(CompanyCreateRouter);
app.use(CompanyIndexRouter);
app.use(CompanyShowRouter);
app.use(CompanyDeleteRouter);
app.use(CompanyUpdateRouter);
app.use(LocationCreateRouter);
app.use(LocationIndexRouter);
app.use(LocationShowRouter);
app.use(LocationUpdateRouter);
app.use(LocationDeleteRouter);
app.use(UserIndexRouter);
app.use(UserShowRouter);
app.use(UserUpdateRouter);
app.use(UserDeleteRouter);
app.use(SearchIndexRouter);
app.use(BankIndexRouter);
app.use(BankCreateRouter);
app.use(BankShowRouter);
app.use(BankUpdateRouter);
app.use(BankDeleteRouter);
app.use(ProductIndexRouter);
app.use(ProductCreateRouter);
app.use(ProductShowRouter);
app.use(ProductUpdateRouter);
app.use(ProductDeleteRouter);
app.use(CartIndexRouter);
app.use(CartShowRouter);
app.use(CartCreateRouter);
app.use(CartUpdateRouter);
app.use(CartDeleteRouter);
app.use(OrderIndexRouter);
app.use(OrderShowRouter);
app.use(OrderCreateRouter);
app.use(OrderUpdateRouter);
app.use(OrderDeleteRouter);
app.use(WalletIndexRouter);
app.use(WalletShowRouter);
app.use(WalletCreateRouter);
app.use(WalletUpdateRouter);
app.use(WalletDeleteRouter);
app.use(HistoryIndexRouter);
app.use(HistoryShowRouter);
app.use(HistoryDeleteRouter);
app.use(BookIndexRouter);
app.use(BookShowRouter);
app.use(BookCreateRouter);
app.use(BookDeleteRouter);
app.use(PassengerIndexRouter);
app.use(PassengerShowRouter);
app.use(PassengerCreateRouter);
app.use(PassengerDeleteRouter);

app.all('*', (req: Request, res: Response) => {
    console.log(req.path);
    throw new Error('API route not found!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong!');
    if (err) {
        console.log(err.message);
        return res.status(400).send({
            message: err.message,
        });
    }

    res.status(400).send({
        message: 'Something went wrong!',
    });
});

export { app };