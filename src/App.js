// src/App.js
import React from "react";

import { Outlet } from "react-router-dom";

function App() {
	return (
		<div>
			{/* <h1>Music Track</h1> */}

			<br />
			<br />
			<Outlet />
		</div>
	);
}

export default App;
