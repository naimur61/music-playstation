import React from "react";
import { Grid, Box } from "@mui/material";
import LoadingModal from "../Shared/LoadingModal";
import MusicCard from "./MusicCard";

const MusicLists = ({ tracks }) => {
	return (
		<Box sx={{ padding: 5, mt: 5 }}>
			{tracks ? (
				<div>
					All Tracks {tracks.message}
					{tracks.data && Array.isArray(tracks.data) ? (
						<Grid container spacing={2}>
							{tracks.data.map((track, i) => (
								<MusicCard key={i} track={track} />
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
