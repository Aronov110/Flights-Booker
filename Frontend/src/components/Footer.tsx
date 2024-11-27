import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Copyright() {
	return (
		<Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
			{`Copyright © ${import.meta.env.VITE_CREATOR}`}
			&nbsp;
			{new Date().getFullYear()}
		</Typography>
	);
}

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
