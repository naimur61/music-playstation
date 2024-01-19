import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import Upload from "./Upload";
import CancelIcon from "@mui/icons-material/Cancel";

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
	backdropFilter: "blur(40px)",
};

const UploadModal = ({ setOpen }) => {
	const handleOpenModal = () => {
		setOpen(false);
	};

	return (
		<Box sx={containerStyle}>
			<Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Stack
					justifyContent="center"
					alignItems="center"
					sx={{ bgcolor: "rgba(0, 0, 0, 0.78)", height: "100%", "&:focus": { outline: "none" } }}
				>
					<CancelIcon
						sx={{ fontSize: "4em", color: "#ca0101", cursor: "pointer" }}
						onClick={handleOpenModal}
					/>
					<Typography variant="h4" mt="2rem" color="white" fontWeight="bold" textAlign="center">
						Upload your video or audio file.
					</Typography>
					<Upload setOpen={setOpen} />
				</Stack>
			</Modal>
		</Box>
	);
};

export default UploadModal;
