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
exports.router = void 0;
const express_1 = require("express");
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const DriverModel_1 = __importDefault(require("../models/DriverModel"));
exports.router = (0, express_1.Router)();
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.router.post('/:orderId/accept', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
