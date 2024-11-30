import { customAlphabet } from "nanoid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

/**
 * Entity representing a flight.
 */
@Entity({ name: "flights" })
export class Flight {
	/**
	 * Unique identifier for the flight.
	 */
	@PrimaryColumn("varchar", { length: 10 })
	id!: string;

	/**
	 * Generates a unique identifier before inserting the flight into the database.
	 */
	@BeforeInsert()
	generateId() {
		const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
		this.id = nanoid();
	}

	/**
	 * Departure location of the flight.
	 */
	@Column("varchar", { nullable: false })
	departure!: string;

	/**
	 * Destination location of the flight.
	 */
	@Column("varchar", { nullable: false })
	destination!: string;

	/**
	 * Departure time of the flight.
	 */
	@Column("timestamp", { nullable: false })
	departureTime!: Date;

	/**
	 * Arrival time of the flight.
	 */
	@Column("timestamp", { nullable: false })
	arrivalTime!: Date;

	/**
	 * Status of the flight (e.g., Scheduled, Delayed, Cancelled).
	 */
	@Column("varchar", { nullable: false })
	status!: string;

	/**
	 * Indicates whether the flight is booked.
	 */
	@Column({ type: "boolean", default: false })
	booked: boolean;
}