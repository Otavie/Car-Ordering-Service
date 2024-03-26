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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const SenderModel_1 = __importDefault(require("./models/SenderModel"));
const DriverModel_1 = __importDefault(require("./models/DriverModel"));
const OrderModel_1 = __importDefault(require("./models/OrderModel"));
const db_1 = __importDefault(require("./database/db"));
// Initialize express app
const app = (0, express_1.default)();
const PORT = 5468;
// Enable Cors
app.use((0, cors_1.default)());
// Connect to Database
(0, db_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
// Endpoint to create a new sender
app.post('/sender', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const newSender = new SenderModel_1.default({ name, email });
        yield newSender.save();
        res.status(201).json(newSender);
    }
    catch (error) {
        console.error('Error creating a sender:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
// Endpoint to create a new driver 
app.post('/driver', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDriver = new DriverModel_1.default({ isAvailable: true });
        yield newDriver.save();
        res.status(201).json(newDriver);
    }
    catch (error) {
        console.error('Error creating a new driver', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
app.post('/order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { location, destination, price, senderId } = req.body;
        const newOrder = new OrderModel_1.default({
            status: 'pending',
            location,
            destination,
            price,
            senderId
        });
        yield newOrder.save();
        res.status(201).json(newOrder);
        // Set a timeout to expire the order after 1 minute
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const expiredOrder = yield OrderModel_1.default.findOneAndUpdate({ _id: newOrder._id, status: 'pending' }, { $set: { status: 'rejected' } }, { new: true });
            if (expiredOrder) {
                notifySender(expiredOrder.id, 'driverNotFound');
            }
        }), 60000);
    }
    catch (error) {
        console.error('Error creating a new order', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
const notifySender = (orderId, evenType) => {
    // Implement notification logic
    console.log(`Notification sent to sender for order ${orderId}: ${evenType}`);
};
// Endpoint for driver to accept an order
app.post('/order/:orderId/accept', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { driverId } = req.body;
        const order = yield OrderModel_1.default.findOne({ _id: orderId, status: 'pending' });
        if (!order) {
            return res.status(404).json({
                message: 'Order not found or already processed.'
            });
        }
        const driver = yield DriverModel_1.default.findOneAndUpdate({ _id: driverId, isAvailable: true }, { $set: { isAvailable: true } }, { new: true });
        if (!driver) {
            return res.status(404).json({
                message: 'Driver not found or not available.'
            });
        }
        order.status = 'accepted';
        order.driverId = driverId;
        yield order.save();
        notifySender(orderId, 'orderAccepted');
        res.status(200).json({
            message: 'Order accepted successfully.'
        });
    }
    catch (error) {
        console.error('Error accepting an order:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
app.listen((PORT), () => {
    console.log(`App is running on PORT http://localhost:${PORT}`);
});
