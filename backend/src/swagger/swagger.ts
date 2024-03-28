import swaggerAutogen from 'swagger-autogen';
import { orderComponent, driverComponent, senderComponent } from './components';

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
            Order: orderComponent,
            Sender: senderComponent,
            Driver: driverComponent
        }
    },
};


const outputFile = './swagger.json'
const endPointFiles = ['../app.ts']

swaggerAutogen({openapi: '3.0.0'})(outputFile, endPointFiles, doc)