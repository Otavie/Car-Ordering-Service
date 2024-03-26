import { Request, Response, Router } from 'express'
import SenderModel from '../models/SenderModel'

export const router: Router = Router()

// Endpoint to create a new sender
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body
        const newSender = new SenderModel({ name, email })
        await newSender.save()
        res.status(201).json(newSender)

    } catch (error) {
        console.error('Error creating a sender:', error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})