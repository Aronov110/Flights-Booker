# The Frontend of the Flights Booker

The frontend of the Flights Booker application is designed to provide a user-friendly interface for managing flight-related data. This frontend is built using React and Material-UI, offering a responsive and interactive experience for users to search, view, and book flights.

## Table of Contents

- Features
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - Prerequisites
  - Installation
  - [Running the Application](#running-the-application)
- Components
- [Environment Variables](#environment-variables)
- Contributing
- License

## Features

- Search for flights by departure and destination.
- View detailed information about each flight.
- Book and manage flight reservations.
- Responsive design for optimal viewing on various devices.
- Dark mode support.

## Technologies Used

- React
- Material-UI
- Axios
- Vite
- TypeScript

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)

### Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/flights-booker-frontend.git
cd flights-booker-frontend
```

2. Install the dependencies:
```sh
npm install
```

3. Set up the environment variables by creating a `.env` file in the root directory and adding the necessary configuration. Refer to the [Environment Variables](#environment-variables) section for details.

### Running the Application

To start the application in development mode, run:
```sh
npm run dev
```

To build the application for production, run:
```sh
npm run build
```

To preview the production build, run:
```sh
npm run preview
```

## Components

### AppBar

The `AppAppBar` component provides the top navigation bar, allowing users to input departure and destination locations for flight searches.

### FlightCard

The `FlightCard` component displays detailed information about individual flights, including departure and arrival times, status, and booking options.

### Footer

The `Footer` component displays the footer section of the application, including copyright information.

### Theme

The `AppTheme` component manages the application's theme settings, including light and dark modes.

## Environment Variables

The application requires the following environment variables to be set:

- `VITE_URL_PATH` - The base URL for the backend API.
- `VITE_CREATOR` - The name of the application's creator.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.