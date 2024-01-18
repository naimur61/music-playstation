import React, { useEffect, useState } from "react";
import { Container, CssBaseline } from "@mui/material";
import MusicLists from "../components/MusicLists";
import LoadingModal from "../Shared/LoadingModal";

const Home = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log(projects);

	// Data fetching
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:5000/api/v1/music");
				const data = await response.json();
				setProjects(data);
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

			<Container component="main" maxWidth="xs">
				<MusicLists />
			</Container>
			{loading && <LoadingModal txt={"Loading!"} />}
		</div>
	);
};

export default Home;
