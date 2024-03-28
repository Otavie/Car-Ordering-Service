import express from 'express'
import cors from 'cors'
// import * as bodyParser from 'body-parser'
import { router as orderRouter } from './routes/order.routes'
import { router as senderRouter } from './routes/sender.routes'
import { router as driverRouter } from './routes/driver.routes'
import dbConnection from './database/db'
const swaggerUI = require('swagger-ui-express');
import swaggerOutput from './swagger/swagger.json'

// Initialize express app
const app = express()
const PORT = 5468

// app.use(bodyParser.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOutput))

// Enable Cors
app.use(cors())

// Connect to Database
dbConnection()

// Middleware to parse JSON
app.use(express.json())

app.use('/sender', senderRouter)
app.use('/driver', driverRouter)
app.use('/order', orderRouter)

app.listen((PORT), () => {
    console.log(`App is running on PORT http://localhost:${PORT}`)
})