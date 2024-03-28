"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import * as bodyParser from 'body-parser'
const order_routes_1 = require("./routes/order.routes");
const sender_routes_1 = require("./routes/sender.routes");
const driver_routes_1 = require("./routes/driver.routes");
const db_1 = __importDefault(require("./database/db"));
const swaggerUI = require('swagger-ui-express');
const swagger_json_1 = __importDefault(require("./swagger/swagger.json"));
// Initialize express app
const app = (0, express_1.default)();
const PORT = 5468;
// app.use(bodyParser.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger_json_1.default));
// Enable Cors
app.use((0, cors_1.default)());
// Connect to Database
(0, db_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
app.use('/sender', sender_routes_1.router);
app.use('/driver', driver_routes_1.router);
app.use('/order', order_routes_1.router);
app.listen((PORT), () => {
    console.log(`App is running on PORT http://localhost:${PORT}`);
});
