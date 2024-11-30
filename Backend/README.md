# The Backend of the Flights Booker

The backend of the Flights Booker application is designed to manage flight-related data and provide APIs for various operations such as creating, updating, retrieving, and deleting flight records. This backend is built using Node.js, Express, and TypeORM, and it connects to a PostgreSQL database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
Database Initialization
Environment Variables
Contributing
License
Features
Create, update, retrieve, and delete flight records.
Support for multiple environments (development, production, test).
Secure HTTP headers using Helmet.
Cross-Origin Resource Sharing (CORS) enabled.
Logging of HTTP requests and errors.
JSON payload parsing.
Technologies Used
Node.js
Express
TypeORM
PostgreSQL
Helmet
CORS
Morgan
Nanoid
Getting Started
Prerequisites
Node.js (version 14 or higher)
PostgreSQL database
### Installation
1. Clone the repository:
```sh
git clone https://github.com/Aronov110/Flights-Booker
cd Backend
```
2. Install the dependencies:
```sh
npm install
```

3. Set up the environment variables by creating a `.env` file in the root directory and adding the necessary configuration. Refer to the [Environment Variables] (#environment-variables) section for details.

### Running the Application

To start the application in development mode, run:
```sh
npm run dev
```

To start the application in production mode, run:
```sh
npm start
```

## API Endpoints

### Flight Routes

- `GET /flights` - Retrieve all flights.
- `POST /flight` - Create a new flight.
- `PATCH /flight/:id` - Update the booking status of a flight.
- `GET /flight/:id` - Retrieve a specific flight by ID.
- `GET /search` - Search for flights by departure and/or destination.
- `DELETE /flight/:id` - Delete a specific flight by ID.
- `DELETE /flights` - Delete all flights.

### Status Route

GET /status - Check the status of the application.

## Database Initialization

The database can be initialized with initial flight data by running the `init-db.ts` script. This script populates the database with predefined flight records if the database is empty.

### Environment Variables

The application requires the following environment variables to be set:

- `DATABASE_HOST` - The hostname of the PostgreSQL database.
- `DATABASE_PORT` - The port number of the PostgreSQL database.
- `DATABASE_USERNAME` - The username for the PostgreSQL database.
- `DATABASE_PASSWORD` - The password for the PostgreSQL database.
- `DATABASE_DATABASE_NAME` - The name of the PostgreSQL database.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.