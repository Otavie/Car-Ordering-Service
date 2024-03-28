"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const components_1 = require("./components");
const doc = {
    info: {
        version: '1.0.0',
        title: 'Car Ordering Service Backend',
        description: 'Backend API documentation for the Car Ordering Service project.',
        contact: {
            name: 'Otavie Okuoyo',
            email: 'otavieokuoyo@gmail.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:5468',
            description: 'Local development server'
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
            }
        },
        schemas: {
            Order: components_1.orderComponent,
            Sender: components_1.senderComponent,
            Driver: components_1.driverComponent
        }
    },
};
const outputFile = './swagger.json';
const endPointFiles = ['../app.ts'];
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endPointFiles, doc);
