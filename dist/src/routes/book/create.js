"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookCreateRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_auth_1 = require("../../middlewares/require-auth");
var validate_request_1 = require("../../middlewares/validate-request");
var book_1 = require("../../models/book");
var flight_1 = require("../../models/flight");
var wallet_1 = require("../../models/wallet");
var meal_type_1 = require("../../utility/meal-type");
var book_validator_1 = require("../../validators/book/book-validator");
var class_type_1 = require("../../utility/class-type");
var passenger_1 = require("../../models/passenger");
var history_1 = require("../../models/history");
var bcryptjs_1 = require("bcryptjs");
var Router = express_1.default.Router();
exports.BookCreateRouter = Router;
Router.post('/api/book', require_auth_1.requireAuth, book_validator_1.BookValidator, validate_request_1.validateRequest, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, passengers, classType, pin, flightId, flight, baseFare, travelClassType, cost_1, wallet, isValidPin, amount, booking, history_2, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 7, , 8]);
                id = (_b = req.currentUser) === null || _b === void 0 ? void 0 : _b.id;
                _a = req.body, passengers = _a.passengers, classType = _a.classType, pin = _a.pin;
                flightId = req.body.flight;
                return [4 /*yield*/, flight_1.Flight.findById(flightId).populate({
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
                    })];
            case 1:
                flight = _c.sent();
                if (!flight) {
                    throw new Error('Flight not found!');
                }
                baseFare = flight.baseFare;
                travelClassType = class_type_1.ClassType.Economic;
                if (classType === 'economic') {
                    travelClassType = class_type_1.ClassType.Economic;
                }
                else if (classType === 'premium') {
                    travelClassType = class_type_1.ClassType.Premium;
                    baseFare *= 1.5;
                }
                else if (classType === 'business') {
                    travelClassType = class_type_1.ClassType.Business;
                    baseFare *= 2;
                }
                else if (classType === 'first') {
                    travelClassType = class_type_1.ClassType.First;
                    baseFare *= 3;
                }
                cost_1 = baseFare;
                passengers.map(function (pid) { return __awaiter(void 0, void 0, void 0, function () {
                    var passenger, meal;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, passenger_1.Passenger.findById(pid)];
                            case 1:
                                passenger = _a.sent();
                                if (passenger) {
                                    meal = passenger.meal;
                                    if (meal === meal_type_1.MealType.Veg) {
                                        cost_1 += 150;
                                    }
                                    else if (meal === meal_type_1.MealType.NonVeg) {
                                        cost_1 += 200;
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, wallet_1.Wallet.findOne({ user: id })];
            case 2:
                wallet = _c.sent();
                if (!wallet) {
                    throw new Error('Wallet not found!');
                }
                return [4 /*yield*/, (0, bcryptjs_1.compare)(pin, wallet.pin)];
            case 3:
                isValidPin = _c.sent();
                if (!isValidPin) {
                    throw new Error('Invalid Pin!');
                }
                amount = wallet.amount;
                if (amount < cost_1) {
                    throw new Error('Wallet amount insufficient!');
                }
                booking = book_1.Book.build({
                    cost: cost_1,
                    classType: travelClassType,
                    passengers: passengers,
                    flight: flightId,
                    user: id,
                });
                return [4 /*yield*/, booking.save()];
            case 4:
                _c.sent();
                wallet.set({
                    amount: amount - cost_1,
                });
                return [4 /*yield*/, wallet.save()];
            case 5:
                _c.sent();
                history_2 = history_1.History.build({
                    amount: cost_1,
                    withdraw: true,
                    user: id,
                });
                return [4 /*yield*/, history_2.save()];
            case 6:
                _c.sent();
                res.status(201).send({
                    message: 'Flight Bookings Done!',
                    booking: booking,
                });
                return [3 /*break*/, 8];
            case 7:
                err_1 = _c.sent();
                next(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
