#!/usr/bin/env node

/**
 * Module dependencies.
 */

import "reflect-metadata";
import * as http from "node:http";
import IP from "ip";
import app from './app.js'; // Ensure the correct extension
import { normalizePort } from './utils/generalUtils.js'; // Ensure the correct extension
// Load environment variables from .env file
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(
	process.env.PORT || process.env.VITE_PORT_HOST || "3000",
);
app.set("port", port);

/**
 * Create HTTP server.
 */

const server: http.Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */
server.on("error", (error: { syscall: string; code: string }) => {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
	console.log(`Server on post ${bind} and on IP ${IP.address()}`);
});

/**
 * Catch unhandled rejections
 */
process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
	// Application specific logging, throwing an error, or other logic here
});

/**
 * Catch uncaught exceptions
 */
process.on("uncaughtException", (error) => {
	console.error("Uncaught Exception:", error);
	// Application specific logging, throwing an error, or other logic here
	process.exit(1); // Optional: exit the process after logging the error
});
