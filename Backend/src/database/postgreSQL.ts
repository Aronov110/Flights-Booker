import path from "node:path";
import { fileURLToPath } from "node:url";
import { Flight } from "../models/flightModel.js";
import dotenv from "dotenv";
import { DataSource, type QueryRunner, Table } from "typeorm";

export type Environment = "development" | "production" | "test";

export const getEnvironment = (): Environment => {
	const env = process.env.NODE_ENV as Environment;
	return env || "development";
};

const envFile = `.env.${getEnvironment()}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.resolve(__dirname, "../../env/", envFile) });

export const appDataSource = new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST,
	port: Number.parseInt(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE_NAME,
	synchronize: true,
	logging: false,
	entities: [Flight],
	migrations: ["src/migration/**/*.ts"],
	subscribers: ["src/subscriber/**/*.ts"],
});

async function checkAndCreateFlightsTable() {
	const queryRunner: QueryRunner = appDataSource.createQueryRunner();
	await queryRunner.connect();

	const tableExists = await queryRunner.hasTable((getEnvironment() === "test")? "flights-test" : "flights");

	if (!tableExists) {
		await queryRunner.createTable(
			new Table({
				name: "flights-test",
				columns: [
					{
						name: "id",
						type: "int",
						isPrimary: true,
						isGenerated: true,
						generationStrategy: "increment",
					},
					{
						name: "departure",
						type: "varchar",
					},
					{
						name: "destination",
						type: "varchar",
					},
					{
						name: "departureTime",
						type: "timestamp",
					},
					{
						name: "arrivalTime",
						type: "timestamp",
					},
					{
						name: "status",
						type: "varchar",
					},
					{
						name: "booked",
						type: "boolean",
					},
				],
			}),
		);
		console.log("Flights table created");
	}

	await queryRunner.release();
}

appDataSource
	.initialize()
	.then(async () => {
		console.log("Connected to the database");
		await checkAndCreateFlightsTable();
	})
	.catch((error) =>
		console.log("Error during Data Source initialization:", error),
	);
