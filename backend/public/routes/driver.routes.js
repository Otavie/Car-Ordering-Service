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
const DriverModel_1 = __importDefault(require("../models/DriverModel"));
exports.router = (0, express_1.Router)();
// Endpoint to create a new driver 
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Driver']
    // #swagger.summary = 'Create a New Driver'
    // #swagger.description = 'Endpoint to create a new driver. Upon creation, the driver is marked as available.'
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
