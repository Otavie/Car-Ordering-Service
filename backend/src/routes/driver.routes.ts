import { Request, Response, Router } from 'express'
import DriverModel from '../models/DriverModel'

export const router: Router = Router()

// Endpoint to create a new driver 
router.post('/', async (req: Request, res: Response) => {
    // #swagger.tags = ['Driver']
    // #swagger.summary = 'Create a New Driver'
    // #swagger.description = 'Endpoint to create a new driver. Upon creation, the driver is marked as available.'
    
    try {
        const newDriver = new DriverModel({ isAvailable: true })
        await newDriver.save()
        res.status(201).json(newDriver)
    } catch (error) {
        console.error('Error creating a new driver', error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})