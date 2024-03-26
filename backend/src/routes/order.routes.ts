import { Request, Response, Router } from 'express'
import OrderModel from '../models/OrderModel'
import DriverModel from '../models/DriverModel'

export const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const { location, destination, price, senderId } = req.body
        const newOrder = new OrderModel({
            status: 'pending',
            location,
            destination,
            price,
            senderId
        }) 
        await newOrder.save()
        res.status(201).json(newOrder)

        // Set a timeout to expire the order after 1 minute
        setTimeout(async () => {
            const expiredOrder = await OrderModel.findOneAndUpdate(
                { _id: newOrder._id, status: 'pending' },
                { $set: { status: 'rejected' }},
                { new: true }
            )

            if (expiredOrder) {
                notifySender(expiredOrder.id, 'driverNotFound')
            }
        }, 60000)
    } catch (error) {
        console.error('Error creating a new order', error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})

const notifySender = (orderId: string, evenType: string) => {
    // Implement notification logic
    console.log(`Notification sent to sender for order ${orderId}: ${evenType}`)
}

// Endpoint for driver to accept an order
router.post('/:orderId/accept', async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params
        const { driverId } = req.body

        const order = await OrderModel.findOne({ _id: orderId, status: 'pending' })
        if (!order) {
            return res.status(404).json({
                message: 'Order not found or already processed.'
            })
        }

        const driver = await DriverModel.findOneAndUpdate(
            { _id: driverId, isAvailable: true },
            { $set: { isAvailable: true } },
            { new: true }
        )

        if (!driver) {
            return res.status(404).json({
                message: 'Driver not found or not available.'
            })
        }

        order.status = 'accepted'
        order.driverId = driverId
        await order.save()
        notifySender(orderId, 'orderAccepted')

        res.status(200).json({
            message: 'Order accepted successfully.'
        })
    } catch (error) {
        console.error('Error accepting an order:', error)
        res.status(500).json({
            message: 'Internal server error'
        })
    }
})
