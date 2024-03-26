# Car Ordering Service Backend

This is the backend portion of the Car Ordering Service project. It provides the necessary server-side functionality to handle order requests, driver interactions, and maintain order/event history.

## Getting Started

To run the backend server locally, follow these steps:

1. Make sure you have Node.js and npm installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the backend directory.
4. Install dependencies by running `npm install`.
5. Start the server by running `npm start`.

The server should now be running on http://localhost:3000 by default.

## Endpoints

### 1. Make Order Request

- **URL**: `/order`
- **Method**: `POST`
- **Description**: Allows the sender to make an order request.
- **Request Body**:
  - `location`: Current location
  - `destination`: Destination
  - `price`: Price
- **Response**: TBD

### 2. Accept Order

- **URL**: `/order/:orderId/accept`
- **Method**: `POST`
- **Description**: Allows the driver to accept an order.
- **Request Params**:
  - `orderId`: ID of the order to accept
- **Response**: TBD

### 3. Reject Order

- **URL**: `/order/:orderId/reject`
- **Method**: `POST`
- **Description**: Allows the driver to reject an order.
- **Request Params**:
  - `orderId`: ID of the order to reject
- **Response**: TBD

### 4. Get Order/Event History

- **URL**: `/history`
- **Method**: `GET`
- **Description**: Retrieves the order/event history.
- **Response**: Array of historical orders/events

## Built With

- Node.js - JavaScript runtime
- Express.js - Web application framework for Node.js

## Authors

- [Otavie Okuoyo](https://github.com/Otavie)

## License

This project is licensed under the [MIT License](LICENSE).
