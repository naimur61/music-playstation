import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useThemeContext } from "../../../Context/Theme/ThemeContextProvider";
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

const LoadingModal = ({ open, txt }) => {
	const { isDarkMode } = useThemeContext();

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: isDarkMode ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.28)",
		boxShadow: 24,
		p: 5,
	};

	return (
		open && (
			<Box sx={containerStyle}>
				<Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
					<Stack justifyContent="center" alignItems="center" sx={style}>
						<RotatingLines
							strokeColor={isDarkMode ? "rgba(33,150,243,1)" : "rgba(110,7,243,1)"}
							strokeWidth="5"
							animationDuration="1.4"
							width="96"
							visible={true}
						/>
						<Typography variant="h4" mt="3rem">
							{txt} is uploading !
						</Typography>
					</Stack>
				</Modal>
			</Box>
		)
	);
};

export default LoadingModal;
