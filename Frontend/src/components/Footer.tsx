import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";

/**
 * Component to display copyright information.
 *
 * @returns {JSX.Element} The Copyright component.
 */
function Copyright() {
	return (
		<Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
			{`Copyright © ${import.meta.env.VITE_CREATOR}`}
			&nbsp;
			{new Date().getFullYear()}
		</Typography>
	);
}

/**
 * Footer component for the application.
 *
 * @returns {JSX.Element} The Footer component.
 */
export default function Footer() {
	return (
		<React.Fragment>
			<Container
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: { xs: 4, sm: 8 },
					py: { xs: 8, sm: 10 },
					textAlign: { sm: "center", md: "left" },
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						pt: { xs: 4, sm: 8 },
						width: "100%",
						borderColor: "divider",
					}}
				>
					<div>
						<Copyright />
					</div>
				</Box>
			</Container>
		</React.Fragment>
	);
}