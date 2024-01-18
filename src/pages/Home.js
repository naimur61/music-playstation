import React from "react";
import { Container, CssBaseline } from "@mui/material";
import MusicLists from "../components/MusicLists";

const Home = () => {
	return (
		<div className="App">
			<CssBaseline />

			<Container component="main" maxWidth="xs">
				<MusicLists />
			</Container>
		</div>
	);
};

export default Home;
