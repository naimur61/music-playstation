// src/App.js
import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div>
			<Navbar />

			<br />
			<br />
			<Outlet />
		</div>
	);
}

export default App;
