import React, { useState } from "react";
import { List, ListItem, Button, Typography, Paper } from "@mui/material";

const tracks = [
	{ id: 1, title: "Track 1", artist: "Artist 1", src: "path/to/track1.mp3" },
	{ id: 2, title: "Track 2", artist: "Artist 2", src: "path/to/track2.mp3" },
];

const MusicLists = () => {
	const [selectedTrack, setSelectedTrack] = useState(null);

	const playTrack = (track) => {
		setSelectedTrack(track);
	};

	return (
		<Paper
			elevation={3}
			sx={{ padding: 2, display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}
		>
			<Typography component="h1" variant="h5">
				Playlist
			</Typography>
			<List>
				{tracks.map((track) => (
					<ListItem key={track.id} sx={{ display: "flex", justifyContent: "space-between" }}>
						<Typography>
							{track.title} by {track.artist}
						</Typography>
						<Button variant="contained" onClick={() => playTrack(track)}>
							Play
						</Button>
					</ListItem>
				))}
			</List>
			{selectedTrack && (
				<div>
					<Typography variant="h6" gutterBottom>
						Now Playing
					</Typography>
					<Typography>
						{selectedTrack.title} by {selectedTrack.artist}
					</Typography>
					{/* Add audio player here with controls and source */}
					<audio controls style={{ width: "100%", marginTop: "10px" }}>
						<source src={selectedTrack.src} type="audio/mp3" />
						Your browser does not support the audio element.
					</audio>
				</div>
			)}
		</Paper>
	);
};

export default MusicLists;
