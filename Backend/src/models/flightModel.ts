import { customAlphabet } from "nanoid";
import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "flights" })
export class Flight {
	@PrimaryColumn("varchar", { length: 10 })
	id!: string;

	@BeforeInsert()
	generateId() {
		const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);
		this.id = nanoid();
	}

	@Column("varchar", { nullable: false })
	departure!: string;

	@Column("varchar", { nullable: false })
	destination!: string;

	@Column("timestamp", { nullable: false })
	departureTime!: Date;

	@Column("timestamp", { nullable: false })
	arrivalTime!: Date;

	@Column("varchar", { nullable: false })
	status!: string;

	@Column({ type: "boolean", default: false })
	booked: boolean;
}
