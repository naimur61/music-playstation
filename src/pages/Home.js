import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import LoadingModal from "../Shared/LoadingModal";
import Test from "../components/Test";
import axios from "axios";
import MusicLists from "../components/MusicLists";

const Home = () => {
	const [tracks, setTracks] = useState([]);
	const [loading, setLoading] = useState(true);

	// Data fetching
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/v1/music");
				setTracks(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="App">
			<CssBaseline />

			<Container component="main">
				<MusicLists tracks={tracks} />
			</Container>
			{loading && <LoadingModal txt={"Loading!"} />}
		</div>
	);
};

export default Home;
