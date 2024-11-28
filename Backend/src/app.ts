import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { flightRoutes } from "./routes/flightRoutes.js";

const app = express();

const allowedOrigins = ["https://flights-booker.onrender.com"];

const options: cors.CorsOptions = {
	origin: allowedOrigins,
};

app.disable("x-powered-by");
app.use(helmet());
app.use(cors(options));
app.use(logger("dev"));
app.use(express.json());
app.use(flightRoutes);
export default app;
