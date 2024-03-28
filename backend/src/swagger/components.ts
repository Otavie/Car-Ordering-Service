export const orderComponent = {
    type: 'object',
    properties: {
        location: {
            type: 'string',
            description: 'The current location where the order originates from.'
        },
        destination: {
            type: 'string',
            description: 'The desired destination (address, landmark) of the car ride.',
        },
        price: {
            type: 'number',
            description: 'The price of the order, usually in the currency specified by the system.'
        },
        senderId: {
            type: 'string',
            description: 'The unique identifier of the sender who placed the order.'
        }
    }
}

export const driverComponent = {
    type: 'object',
    properties: {
        isAvailable: {
            type: 'boolean',
            description: 'Indicates whether the driver is available.'
        }
    }
}

export const senderComponent = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'Name of the sender'
        },
        email: {
            type: 'string',
            description: 'Email of the sender.'
        }
    }
}