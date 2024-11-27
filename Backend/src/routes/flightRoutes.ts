// Import necessary modules and dependencies
import { appDataSource } from "../database/postgreSQL.js";
import { Flight } from "../models/flightModel.js";
import { wrap } from "../utils/generalUtils.js";
import express, { type Response, type Request } from "express";

// Create a new express router
export const flightRoutes = express.Router();

flightRoutes.get(
	"/status",
	wrap(async (req: Request, res: Response) => {
		return res.status(200).send();
	}),
);

// POST request for creating a new Flight.
flightRoutes.post(
	"/flight",
	wrap(async (req: Request, res: Response) => {
		const {
			departure,
			destination,
			departureTime,
			arrivalTime,
			status,
			booked,
		} = req.body;
		const flightRepository = appDataSource.getRepository(Flight);

		const flight = new Flight();
		flight.departure = departure;
		flight.destination = destination;
		flight.departureTime = new Date(departureTime);
		flight.arrivalTime = new Date(arrivalTime);
		flight.status = status;
		flight.booked = booked ?? false;

		try {
			const savedFlight = await flightRepository.save(flight);
			return res.status(201).json(savedFlight);
		} catch (error) {
			return res.status(500).json({ message: "Error saving flight", error });
		}
	}),
);

// POST request to create multiple flights
flightRoutes.post("/flights", async (req, res) => {
	const flightsData = req.body;
	const flightRepository = appDataSource.getRepository(Flight);

	const flights = flightsData.map((data) => {
		const flight = new Flight();
		flight.departure = data.departure;
		flight.destination = data.destination;
		flight.departureTime = new Date(data.departureTime);
		flight.arrivalTime = new Date(data.arrivalTime);
		flight.status = data.status;
		flight.booked = data.booked ?? false;
		return flight;
	});

	try {
		const savedFlights = await flightRepository.save(flights);
		return res.status(201).json(savedFlights);
	} catch (error) {
		return res.status(500).json({ message: "Error saving flights", error });
	}
});

// PATCH request for updating a Flight booked status.
flightRoutes.patch(
	"/flight/:id",
	wrap(async (req: Request, res: Response) => {
		const flightRepository = appDataSource.getRepository(Flight);
		const { id } = req.params;

		try {
			const flight = await flightRepository.findOneBy({
				id: id,
			});
			if (flight) {
				flight.booked = !flight.booked;
				const updatedFlight = await flightRepository.save(flight);
				return res.status(200).json(updatedFlight);
			}
			return res.status(404).json({ message: "Flight not found" });
		} catch (error) {
			return res.status(500).json({ message: "Error updating flight", error });
		}
	}),
);

// GET request for all Flights in the database.
flightRoutes.get(
	"/flights",
	wrap(async (req: Request, res: Response) => {
		const flightRepository = appDataSource.getRepository(Flight);

		try {
			const flights = await flightRepository.find();
			return res.status(200).json(flights);
		} catch (error) {
			return res.status(500).json({ message: "Error fetching flights", error });
		}
	}),
);

// GET request for a specific Flight by ID.
flightRoutes.get(
	"/flight/:id",
	wrap(async (req: Request, res: Response) => {
		const flightRepository = appDataSource.getRepository(Flight);
		const { id } = req.params;

		try {
			const flight = await flightRepository.findOneBy({
				id: id,
			});
			if (flight) {
				return res.status(200).json(flight);
			}
			return res.status(404).json({ message: "Flight not found" });
		} catch (error) {
			return res.status(404).json({ message: "Flight not found" });
		}
	}),
);

// GET request for a specific Flights by departure and/or destination using fuzzy search
flightRoutes.get(
	"/search", 
	wrap(async (req: Request, res: Response) => {
			const flightRepository = appDataSource.getRepository(Flight);
			const { departure, destination } = req.query;

			try {
					const query = flightRepository.createQueryBuilder("flight");

					if (departure) {
							query.andWhere("UPPER(flight.departure) LIKE UPPER(:departure)", { 
									departure: `%${departure}%` 
							});
					}

					if (destination) {
							query.andWhere("UPPER(flight.destination) LIKE UPPER(:destination)", { 
									destination: `%${destination}%` 
							});
					}

					if (!departure && !destination) {
							return res.status(400).json({
									message: "Please provide a departure and/or destination query parameter."
							});
					}

					const flights = await query.getMany();
					return res.status(200).json(flights);
			} catch (error) {
					return res.status(500).json({ message: "Error fetching flights", error });
			}
	})
);

// DELETE request to delete a Flight by ID.
flightRoutes.delete(
	"/flight/:id",
	wrap(async (req: Request, res: Response) => {
		const flightRepository = appDataSource.getRepository(Flight);
		const { id } = req.params;

		try {
			const flight = await flightRepository.findOneBy({
				id: id,
			});
			if (flight) {
				await flightRepository.remove(flight);
				return res.status(200).json({ message: "Flight deleted successfully" });
			}
			return res.status(404).json({ message: "Flight not found" });
		} catch (error) {
			return res.status(500).json({ message: "Error deleting flight", error });
		}
	}),
);

// DELETE request to delete all Flights.
flightRoutes.delete(
	"/flights",
	wrap(async (req: Request, res: Response) => {
		const flightRepository = appDataSource.getRepository(Flight);

		try {
			await flightRepository.clear();
			return res
				.status(200)
				.json({ message: "All flights have been deleted." });
		} catch (error) {
			return res.status(500).json({ message: "Error deleting flights", error });
		}
	}),
);
