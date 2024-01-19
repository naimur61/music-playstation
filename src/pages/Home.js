import React, { useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import LoadingModal from "../Shared/LoadingModal";
import MusicLists from "../components/MusicLists";
import Navbar from "../components/Navbar";

const Home = () => {
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<div className="App">
			<Navbar setTracks={setTracks} setLoading={setLoading} />
			<CssBaseline />

			<Container component="main">
				<MusicLists tracks={tracks} />
			</Container>
			{loading && <LoadingModal txt={"Loading!"} />}
		</div>
	);
};

export default Home;
