import request from "supertest";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import app from "../src/app";
import { appDataSource } from "../src/database/postgreSQL";

describe("Flight Tester", async () => {
	const flights = [
		{
			departure: "London",
			destination: "Paris",
			departureTime: "2024-04-15T08:00:00Z",
			arrivalTime: "2024-04-15T09:30:00Z",
			status: "Scheduled",
			booked: false,
		},
		{
			departure: "New York",
			destination: "Los Angeles",
			departureTime: "2024-04-16T14:00:00Z",
			arrivalTime: "2024-04-16T17:30:00Z",
			status: "Delayed",
			booked: true,
		},
		{
			departure: "Tokyo",
			destination: "Seoul",
			departureTime: "2024-04-17T10:00:00Z",
			arrivalTime: "2024-04-17T12:00:00Z",
			status: "Scheduled",
			booked: false,
		},
		{
			departure: "Dubai",
			destination: "Mumbai",
			departureTime: "2024-04-18T23:00:00Z",
			arrivalTime: "2024-04-19T01:30:00Z",
			status: "Scheduled",
			booked: true,
		},
		{
			departure: "Sydney",
			destination: "Singapore",
			departureTime: "2024-04-19T19:00:00Z",
			arrivalTime: "2024-04-20T00:30:00Z",
			status: "Delayed",
			booked: false,
		},
		{
			departure: "Paris",
			destination: "Rome",
			departureTime: "2024-04-20T11:30:00Z",
			arrivalTime: "2024-04-20T13:30:00Z",
			status: "Scheduled",
			booked: true,
		},
		{
			departure: "Amsterdam",
			destination: "Berlin",
			departureTime: "2024-04-21T07:00:00Z",
			arrivalTime: "2024-04-21T08:30:00Z",
			status: "Scheduled",
			booked: false,
		},
		{
			departure: "Hong Kong",
			destination: "Bangkok",
			departureTime: "2024-04-22T16:00:00Z",
			arrivalTime: "2024-04-22T18:00:00Z",
			status: "Cancelled",
			booked: false,
		},
		{
			departure: "Los Angeles",
			destination: "Vancouver",
			departureTime: "2024-04-23T09:00:00Z",
			arrivalTime: "2024-04-23T12:00:00Z",
			status: "Scheduled",
			booked: true,
		},
		{
			departure: "Madrid",
			destination: "London",
			departureTime: "2024-04-24T13:00:00Z",
			arrivalTime: "2024-04-24T14:30:00Z",
			status: "Delayed",
			booked: true,
		},
		{
			departure: "Singapore",
			destination: "Tokyo",
			departureTime: "2024-04-25T22:00:00Z",
			arrivalTime: "2024-04-26T06:00:00Z",
			status: "Scheduled",
			booked: false,
		},
		{
			departure: "Mumbai",
			destination: "Dubai",
			departureTime: "2024-04-26T03:00:00Z",
			arrivalTime: "2024-04-26T05:30:00Z",
			status: "Scheduled",
			booked: true,
		},
		{
			departure: "Berlin",
			destination: "Paris",
			departureTime: "2024-04-27T15:30:00Z",
			arrivalTime: "2024-04-27T17:00:00Z",
			status: "Scheduled",
			booked: false,
		},
		{
			departure: "Bangkok",
			destination: "Hong Kong",
			departureTime: "2024-04-28T08:30:00Z",
			arrivalTime: "2024-04-28T10:30:00Z",
			status: "Delayed",
			booked: true,
		},
		{
			departure: "Vancouver",
			destination: "New York",
			departureTime: "2024-04-29T11:00:00Z",
			arrivalTime: "2024-04-29T19:00:00Z",
			status: "Scheduled",
			booked: false,
		},
		{
			departure: "Rome",
			destination: "Madrid",
			departureTime: "2024-04-30T14:30:00Z",
			arrivalTime: "2024-04-30T16:30:00Z",
			status: "Scheduled",
			booked: true,
		},
		{
			departure: "Seoul",
			destination: "Sydney",
			departureTime: "2024-05-01T01:00:00Z",
			arrivalTime: "2024-05-01T12:00:00Z",
			status: "Delayed",
			booked: false,
		},
		{
			departure: "London",
			destination: "Amsterdam",
			departureTime: "2024-05-02T06:30:00Z",
			arrivalTime: "2024-05-02T08:00:00Z",
			status: "Scheduled",
			booked: true,
		},
		{
			departure: "Paris",
			destination: "Dubai",
			departureTime: "2024-05-03T20:00:00Z",
			arrivalTime: "2024-05-04T04:00:00Z",
			status: "Scheduled",
			booked: false,
		},
		{
			departure: "New York",
			destination: "Tokyo",
			departureTime: "2024-05-04T10:00:00Z",
			arrivalTime: "2024-05-05T02:00:00Z",
			status: "Scheduled",
			booked: true,
		},
	];

	beforeEach(async () => {
		await appDataSource.initialize();
	});

	afterEach(async () => {
		await appDataSource.destroy();
	});

	it("GET /flights returns all flights", async () => {
		const response = await request(app).get("/flights");
		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});

	it("POST /flight creates new flight", async () => {
		const response = await request(app).post("/flight").send(flights[0]);
		expect(response.status).toBe(201);
	});

	it("PATCH /flight/:id updates flight booking status", async () => {
		let response = await request(app).get("/flights");
		const mockFlight = response.body[0];
		response = await request(app).patch(`/flight/${mockFlight.id}`);
		expect(response.status).toBe(200);
		expect(response.body.booked).toBe(!mockFlight.booked);
	});
});
