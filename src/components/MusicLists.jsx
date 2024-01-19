import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import LoadingModal from "../Shared/LoadingModal";
import MusicCard from "./MusicCard";

const MusicLists = ({ tracks }) => {
	return (
		<Box sx={{ padding: 5, mt: 5 }}>
			{tracks ? (
				<div>
					Total {tracks?.meta?.total} {tracks.message}
					{tracks.data && Array.isArray(tracks.data) ? (
						<Grid container spacing={2}>
							{tracks.data.map((track, i) => (
								<MusicCard key={i} track={track} />
							))}
						</Grid>
					) : (
						<Typography variant="h4" textAlign="center" mt={5} fontWeight="bold" color="#ca0101">
							No track data available
						</Typography>
					)}
				</div>
			) : (
				<LoadingModal txt={"Loading !"} />
			)}
		</Box>
	);
};

export default MusicLists;
