"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path_1 = __importDefault(require("path"));
var body_parser_1 = require("body-parser");
// import proxy from 'express-http-proxy';
var express_1 = __importDefault(require("express"));
// import cookieParser from 'cookie-parser';
// import cookieSession from 'cookie-session';
var multer_1 = __importDefault(require("multer"));
var current_user_1 = require("./src/middlewares/current-user");
var signup_1 = require("./src/routes/auth/signup");
var login_1 = require("./src/routes/auth/login");
var create_1 = require("./src/routes/flight/create");
var flight_1 = require("./src/routes/flight");
var show_1 = require("./src/routes/flight/show");
var delete_1 = require("./src/routes/flight/delete");
var update_1 = require("./src/routes/flight/update");
var create_2 = require("./src/routes/gallery/create");
var gallery_1 = require("./src/routes/gallery");
var show_2 = require("./src/routes/gallery/show");
var delete_2 = require("./src/routes/gallery/delete");
var update_2 = require("./src/routes/gallery/update");
var create_3 = require("./src/routes/company/create");
var company_1 = require("./src/routes/company");
var show_3 = require("./src/routes/company/show");
var delete_3 = require("./src/routes/company/delete");
var update_3 = require("./src/routes/company/update");
var create_4 = require("./src/routes/location/create");
var location_1 = require("./src/routes/location");
var show_4 = require("./src/routes/location/show");
var update_4 = require("./src/routes/location/update");
var delete_4 = require("./src/routes/location/delete");
var show_5 = require("./src/routes/user/show");
var update_5 = require("./src/routes/user/update");
var user_1 = require("./src/routes/user");
var delete_5 = require("./src/routes/user/delete");
var logout_1 = require("./src/routes/auth/logout");
var search_1 = require("./src/routes/search");
var bank_1 = require("./src/routes/bank");
var create_5 = require("./src/routes/bank/create");
var show_6 = require("./src/routes/bank/show");
var update_6 = require("./src/routes/bank/update");
var delete_6 = require("./src/routes/bank/delete");
var product_1 = require("./src/routes/product");
var show_7 = require("./src/routes/product/show");
var create_6 = require("./src/routes/product/create");
var update_7 = require("./src/routes/product/update");
var delete_7 = require("./src/routes/product/delete");
var cart_1 = require("./src/routes/cart");
var show_8 = require("./src/routes/cart/show");
var create_7 = require("./src/routes/cart/create");
var update_8 = require("./src/routes/cart/update");
var delete_8 = require("./src/routes/cart/delete");
var order_1 = require("./src/routes/order");
var show_9 = require("./src/routes/order/show");
var create_8 = require("./src/routes/order/create");
var update_9 = require("./src/routes/order/update");
var delete_9 = require("./src/routes/order/delete");
var create_9 = require("./src/routes/wallet/create");
var wallet_1 = require("./src/routes/wallet");
var show_10 = require("./src/routes/wallet/show");
var update_10 = require("./src/routes/wallet/update");
var delete_10 = require("./src/routes/wallet/delete");
var history_1 = require("./src/routes/history");
var show_11 = require("./src/routes/history/show");
var delete_11 = require("./src/routes/history/delete");
var book_1 = require("./src/routes/book");
var show_12 = require("./src/routes/book/show");
var create_10 = require("./src/routes/book/create");
var delete_12 = require("./src/routes/book/delete");
var passenger_1 = require("./src/routes/passenger");
var show_13 = require("./src/routes/passenger/show");
var create_11 = require("./src/routes/passenger/create");
var delete_13 = require("./src/routes/passenger/delete");
var app = (0, express_1.default)();
exports.app = app;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            cb(null, 'images');
        }
        else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
            cb(null, 'videos');
        }
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4' || file.mimetype === 'video/x-flv') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use((0, multer_1.default)({ storage: storage, fileFilter: fileFilter }).any());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
app.use('/videos', express_1.default.static(path_1.default.join(__dirname, 'videos')));
app.set('trust proxy', true);
app.use((0, body_parser_1.json)());
// app.use(cookieSession({
//     signed: false,
//     secure: false,
// }));
// app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(current_user_1.currentUser);
app.use(signup_1.SignupRouter);
app.use(login_1.LoginRouter);
app.use(logout_1.LogoutRouter);
app.use(create_1.FlightCreateRouter);
app.use(flight_1.FlightIndexRouter);
app.use(show_1.FlightShowRouter);
app.use(delete_1.FlightDeleteRouter);
app.use(update_1.FlightUpdateRouter);
app.use(create_2.GalleryCreateRouter);
app.use(gallery_1.GalleryIndexRouter);
app.use(show_2.GalleryShowRouter);
app.use(delete_2.GalleryDeleteRouter);
app.use(update_2.GalleryUpdateRouter);
app.use(create_3.CompanyCreateRouter);
app.use(company_1.CompanyIndexRouter);
app.use(show_3.CompanyShowRouter);
app.use(delete_3.CompanyDeleteRouter);
app.use(update_3.CompanyUpdateRouter);
app.use(create_4.LocationCreateRouter);
app.use(location_1.LocationIndexRouter);
app.use(show_4.LocationShowRouter);
app.use(update_4.LocationUpdateRouter);
app.use(delete_4.LocationDeleteRouter);
app.use(user_1.UserIndexRouter);
app.use(show_5.UserShowRouter);
app.use(update_5.UserUpdateRouter);
app.use(delete_5.UserDeleteRouter);
app.use(search_1.SearchIndexRouter);
app.use(bank_1.BankIndexRouter);
app.use(create_5.BankCreateRouter);
app.use(show_6.BankShowRouter);
app.use(update_6.BankUpdateRouter);
app.use(delete_6.BankDeleteRouter);
app.use(product_1.ProductIndexRouter);
app.use(create_6.ProductCreateRouter);
app.use(show_7.ProductShowRouter);
app.use(update_7.ProductUpdateRouter);
app.use(delete_7.ProductDeleteRouter);
app.use(cart_1.CartIndexRouter);
app.use(show_8.CartShowRouter);
app.use(create_7.CartCreateRouter);
app.use(update_8.CartUpdateRouter);
app.use(delete_8.CartDeleteRouter);
app.use(order_1.OrderIndexRouter);
app.use(show_9.OrderShowRouter);
app.use(create_8.OrderCreateRouter);
app.use(update_9.OrderUpdateRouter);
app.use(delete_9.OrderDeleteRouter);
app.use(wallet_1.WalletIndexRouter);
app.use(show_10.WalletShowRouter);
app.use(create_9.WalletCreateRouter);
app.use(update_10.WalletUpdateRouter);
app.use(delete_10.WalletDeleteRouter);
app.use(history_1.HistoryIndexRouter);
app.use(show_11.HistoryShowRouter);
app.use(delete_11.HistoryDeleteRouter);
app.use(book_1.BookIndexRouter);
app.use(show_12.BookShowRouter);
app.use(create_10.BookCreateRouter);
app.use(delete_12.BookDeleteRouter);
app.use(passenger_1.PassengerIndexRouter);
app.use(show_13.PassengerShowRouter);
app.use(create_11.PassengerCreateRouter);
app.use(delete_13.PassengerDeleteRouter);
app.all('*', function (req, res) {
    console.log(req.path);
    throw new Error('API route not found!');
});
app.use(function (err, req, res, next) {
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
