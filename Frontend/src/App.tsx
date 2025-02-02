import Container from "@mui/joy/Container";
import { Box, CssBaseline, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import type * as React from "react";
import { useEffect, useState } from "react";
import AppAppBar from "./components/AppBar";
import FlightCard from "./components/FlightCard";
import Footer from "./components/Footer";
import AppTheme from "./theme/AppTheme";

/**
 * Interface representing the properties of a flight card.
 */
export interface FlightCardProps {
	id: string;
	departure: string;
	destination: string;
	status: string;
	departureTime: string;
	arrivalTime: string;
	booked: boolean;
}

/**
 * Main application component.
 *
 * @returns {JSX.Element} The main application component.
 */
export default function App(): JSX.Element {
	const [departure, setDeparture] = useState<string>("");
	const [destination, setDestination] = useState<string>("");
	const [cardData, setCardData] = useState<FlightCardProps[]>([]);
	const [disableSearch, setDisableSearch] = useState<boolean>(false);

	console.log(import.meta.env.VITE_URL_PATH);

	/**
	 * Handles the change event for the departure input field.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
	 */
	const handleDepartureChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setDeparture(event.target.value);
	};

	/**
	 * Handles the change event for the destination input field.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
	 */
	const handleDestinationChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setDestination(event.target.value);
	};

	/**
	 * Fetches flight data from the server based on the departure and destination.
	 */
	const fetchFlightsData = async () => {
		const url = `${import.meta.env.VITE_URL_PATH}/${destination === "" && departure === "" ? "flights/" : "search/"}`;
		const params: { [key: string]: string } = {};
		if (departure !== "") {
			params.departure = departure;
		}
		if (destination !== "") {
			params.destination = destination;
		}
		const response = await axios.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
			params: params,
		});
		setCardData(response.data);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timeout = setTimeout(() => {
			setDisableSearch(true);
			fetchFlightsData().finally(() => {
				setDisableSearch(false);
			});
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, [departure, destination]);

	return (
		<AppTheme>
			<CssBaseline enableColorScheme />
			<AppAppBar
				departure={departure}
				destination={destination}
				handleDepartureChange={handleDepartureChange}
				handleDestinationChange={handleDestinationChange}
				disableSearch={disableSearch}
			/>
			<Container
				maxWidth="lg"
				component="main"
				sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
			>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
					<div>
						<Typography variant="h1" gutterBottom>
							Flights Booker
						</Typography>
						<Typography>
							Find flights and book your next trip with ease
						</Typography>
					</div>
					<Grid container spacing={2} columns={12}>
						{disableSearch
							? Array.from(new Array(6)).map((_, index) => {
									const uniqueKey = `skeleton-${index}-${Math.random()}`;
									return (
										<Grid size={{ xs: 12, sm: 4 }} key={uniqueKey}>
											<Skeleton
												variant="rectangular"
												width="100%"
												height={200}
											/>
											<Skeleton width="60%" />
											<Skeleton width="80%" />
										</Grid>
									);
								})
							: Array.isArray(cardData) &&
								cardData.map((card) => <FlightCard {...card} key={card.id} />)}
					</Grid>
				</Box>
			</Container>
			<Footer />
		</AppTheme>
	);
}