import cors from "cors";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { flightRoutes } from "./routes/flightRoutes.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(flightRoutes);
export default app;
