import { TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import ColorModeIconDropdown from "../theme/ColorModeIconDropdown";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	flexShrink: 0,
	borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
	backdropFilter: "blur(24px)",
	border: "0px solid",
	borderColor: theme.palette.divider,
	backgroundColor: alpha(theme.palette.background.default, 0.4),
	boxShadow: theme.shadows[1],
	padding: "8px 12px",
}));

interface AppAppBarProps {
	departure: string;
	handleDepartureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	destination: string;
	handleDestinationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	disableSearch: boolean;
}

export default function AppAppBar(props: AppAppBarProps) {
	return (
		<AppBar
			position="fixed"
			enableColorOnDark
			sx={{
				boxShadow: 0,
				bgcolor: "transparent",
				backgroundImage: "none",
				mt: "calc(var(--template-frame-height, 0px) + 28px)",
			}}
		>
			<Container>
				<StyledToolbar variant="dense" disableGutters>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							alignItems: "center",
							px: 0,
							flexDirection: { xs: "column", sm: "row" },
						}}
					>
						<TextField
							id="departure"
							hiddenLabel
							size="small"
							variant="outlined"
							fullWidth
							aria-label="Enter a departure"
							placeholder="Departure"
							slotProps={{
								htmlInput: {
									autoComplete: "off",
									"aria-label": "Enter a departure",
								},
							}}
							sx={{
								width: { xs: "100%", sm: "250px" },
								marginRight: { xs: 0, sm: "10px" },
								marginBottom: { xs: "10px", sm: 0 },
							}}
							value={props.departure}
							onChange={props.handleDepartureChange}
							disabled={props.disableSearch}
						/>
						<TextField
							id="destination"
							hiddenLabel
							size="small"
							variant="outlined"
							fullWidth
							aria-label="Enter a destination"
							placeholder="Destination"
							slotProps={{
								htmlInput: {
									autoComplete: "off",
									"aria-label": "Enter a destination",
								},
							}}
							sx={{
								width: { xs: "100%", sm: "250px" },
							}}
							value={props.destination}
							onChange={props.handleDestinationChange}
							disabled={props.disableSearch}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							gap: 1,
							alignItems: "center",
						}}
					>
						<ColorModeIconDropdown />
					</Box>
				</StyledToolbar>
			</Container>
		</AppBar>
	);
}
