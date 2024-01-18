import React from "react";
import { Paper, CardContent, Typography, CardActions, IconButton, Grid } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const MusicCard = ({ track }) => {
	return (
		<Grid item xs={12} md={6} lg={4}>
			<Paper elevation={3} sx={{ backgroundColor: "#87CEEB", borderRadius: "3px", overflow: "hidden" }}>
				{/* <img
					src={track.musicUrl || "url-to-default-thumbnail-image"}
					alt={track.title}
					style={{ width: "100%", height: "140px", objectFit: "cover" }}
				/> */}
				<video controls style={{ width: "100%" }}>
					<source src={track.musicUrl} type="video/mp4" />
					Your browser does not support the video element.
				</video>
				<CardContent sx={{ py: 0 }}>
					<Typography variant="h6" component="div">
						{track.title}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						{track.artist}
					</Typography>
				</CardContent>
				<CardActions>
					<IconButton color="primary" aria-label="play">
						<PlayArrowIcon />
					</IconButton>
					<IconButton color="primary" aria-label="pause">
						<PauseIcon />
					</IconButton>
				</CardActions>
			</Paper>
		</Grid>
	);
};

export default MusicCard;
