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
exports.FlightUpdateRouter = void 0;
var express_1 = __importDefault(require("express"));
var require_admin_1 = require("../../middlewares/require-admin");
var require_auth_1 = require("../../middlewares/require-auth");
var validate_request_1 = require("../../middlewares/validate-request");
var flight_1 = require("../../models/flight");
var flight_validator_1 = require("../../validators/flight/flight-validator");
var Router = express_1.default.Router();
exports.FlightUpdateRouter = Router;
Router.put('/api/flight/:id', require_auth_1.requireAuth, require_admin_1.requireAdmin, flight_validator_1.FlightValidator, validate_request_1.validateRequest, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, flightNo, brand, origin_1, destination, arrival, departure, gateNo, terminal, baseFare, flight, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, flightNo = _a.flightNo, brand = _a.brand, origin_1 = _a.origin, destination = _a.destination, arrival = _a.arrival, departure = _a.departure, gateNo = _a.gateNo, terminal = _a.terminal, baseFare = _a.baseFare;
                return [4 /*yield*/, flight_1.Flight.findById(id)];
            case 1:
                flight = _b.sent();
                if (!flight) {
                    throw new Error('Flight Not Found!');
                }
                flight.set({
                    flightNo: flightNo,
                    brand: brand,
                    origin: origin_1,
                    destination: destination,
                    arrival: arrival,
                    departure: departure,
                    gateNo: gateNo,
                    terminal: terminal,
                    status: 'scheduled',
                    baseFare: baseFare,
                });
                return [4 /*yield*/, flight.save()];
            case 2:
                _b.sent();
                res.status(204).send({
                    message: 'Flight Updated',
                    flight: flight,
                });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
