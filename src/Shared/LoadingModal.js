import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RotatingLines } from "react-loader-spinner";
import { Stack } from "@mui/material";

const containerStyle = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "100vw",
	height: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "transparent",
	backdropFilter: "blur(10px)", // Blue background outside the modal
};

const LoadingModal = ({ txt }) => {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "rgba(0, 0, 0, 0.4)",
		boxShadow: 24,
		px: 5,
		py: 7,
		"&:focus": { outline: "none" },
	};

	return (
		<Box sx={containerStyle}>
			<Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Stack justifyContent="center" alignItems="center" sx={style}>
					<RotatingLines
						strokeColor="rgba(33,150,243,1)"
						strokeWidth="5"
						animationDuration="1.4"
						width="96"
						visible={true}
					/>
					<Typography variant="h4" mt="2rem" color="white" fontWeight="bold" textAlign="center">
						{txt}
					</Typography>
				</Stack>
			</Modal>
		</Box>
	);
};

export default LoadingModal;
