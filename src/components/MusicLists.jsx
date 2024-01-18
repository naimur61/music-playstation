import React from "react";
import {
	Paper,
	Typography,
	Button,
	Card,
	CardContent,
	CardActions,
	CardMedia,
	Grid,
	Box,
} from "@mui/material";
import LoadingModal from "../Shared/LoadingModal";

const MusicLists = ({ tracks }) => {
	return (
		<Box sx={{ padding: 5, mt: 5 }}>
			{tracks ? (
				<div>
					All Tracks {tracks.message}
					{tracks.data && Array.isArray(tracks.data) ? (
						<Grid container spacing={2}>
							{tracks.data.map((track, i) => (
								<Grid item xs={12} md={6} lg={4} key={i}>
									<Paper elevation={3}>
										<CardMedia component="img" height="140" alt={track.title} src={track.musicUrl} />
										<CardContent>
											<Typography variant="h6" component="div">
												{track.title}
											</Typography>
											<Typography variant="subtitle1" color="text.secondary">
												{track.artist}
											</Typography>
										</CardContent>
										<CardActions>
											<Button variant="contained">Play</Button>
										</CardActions>
									</Paper>
								</Grid>
							))}
						</Grid>
					) : (
						<p>No track data available</p>
					)}
				</div>
			) : (
				<LoadingModal txt={"Loading !"} />
			)}
		</Box>
	);
};

export default MusicLists;
