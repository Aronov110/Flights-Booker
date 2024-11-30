import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { flightRoutes } from "./routes/flightRoutes.js";

const app = express();

/**
 * Disables the "X-Powered-By" header for security reasons.
 */
app.disable("x-powered-by");

/**
 * Adds security-related HTTP headers to the response.
 */
app.use(helmet());

/**
 * Enables Cross-Origin Resource Sharing (CORS) with the specified options.
 */
app.use(
	cors({
		origin: true,
	}),
);

/**
 * Logs HTTP requests and errors using the "dev" format.
 */
app.use(logger("dev"));

/**
 * Parses incoming requests with JSON payloads.
 */
app.use(express.json());

/**
 * Mounts the flight-related routes on the application.
 */
app.use(flightRoutes);

export default app;