import { Box, Chip, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { format } from "date-fns";
import * as React from "react";
import { useState } from "react";
import type { FlightCardProps } from "../App";

const StyledCard = styled(Card)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	padding: 0,
	height: "100%",
	backgroundColor: theme.palette.background.paper,
	"&:hover": {
		backgroundColor: "transparent",
		cursor: "pointer",
	},
	"&:focus-visible": {
		outline: "3px solid",
		outlineColor: "hsla(210, 98%, 48%, 0.5)",
		outlineOffset: "2px",
	},
}));

const StyledCardContent = styled(CardContent)({
	display: "flex",
	flexDirection: "column",
	gap: 4,
	padding: 16,
	flexGrow: 1,
	"&:last-child": {
		paddingBottom: 16,
	},
});

const StyledTypography = styled(Typography)({
	display: "-webkit-box",
	WebkitBoxOrient: "vertical",
	WebkitLineClamp: 4,
	overflow: "hidden",
	textOverflow: "ellipsis",
});

export default function FlightCard(props: FlightCardProps) {
	const [disableButton, setDisableButton] = useState<boolean>(false);
	const [booked, setBooked] = useState<boolean>(props.booked);
	const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
		null,
	);

	const handleClick = async () => {
		setDisableButton(true);
		const url = `${import.meta.env.VITE_URL_PATH}/flight/${props.id}`;
		const response = await axios.patch(url, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			setBooked(!booked);
		}
		setDisableButton(false);
	};

	const handleFocus = (index: number) => {
		setFocusedCardIndex(index);
	};

	const handleBlur = () => {
		setFocusedCardIndex(null);
	};

	return (
		<Grid size={{ xs: 12, sm: 4 }}>
			<StyledCard
				variant="outlined"
				onFocus={() => handleFocus(2)}
				onBlur={handleBlur}
				tabIndex={0}
				className={focusedCardIndex === 2 ? "Mui-focused" : ""}
				sx={{ height: "100%" }}
			>
				<StyledCardContent>
					<Typography gutterBottom variant="h6" component="div">
						{`Flight from ${props.departure} to ${props.destination}`}
					</Typography>
					<StyledTypography variant="body2" color="text.secondary" gutterBottom>
						{props.status === "Cancelled"
							? "Flight Cancelled"
							: `Currently ${props.status}, departing at ${format(new Date(props.departureTime), "PPpp")} and arriving at ${format(new Date(props.arrivalTime), "PPpp")}`}
					</StyledTypography>
				</StyledCardContent>

				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						gap: 2,
						alignItems: "center",
						justifyContent: "space-between",
						padding: "16px",
					}}
				>
					<Typography gutterBottom variant="caption" component="div">
						{`Flight ID: ${props.id}`}
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							gap: 1,
							alignItems: "center",
						}}
					/>
					{props.status === "Cancelled" ? (
						<></>
					) : (
						<Chip
							onClick={handleClick}
							size="medium"
							label={booked ? "Booked" : "Book Now"}
							sx={{
								backgroundColor: "transparent",
							}}
							disabled={disableButton}
						/>
					)}
				</Box>
			</StyledCard>
		</Grid>
	);
}
