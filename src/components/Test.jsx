import React from "react";

const Test = ({ tracks }) => {
	// console.log(tracks);
	return (
		<div>
			{tracks ? (
				<div>
					All Tracks {tracks.message}
					{tracks.data && Array.isArray(tracks.data) ? (
						tracks.data.map((track, i) => <h1 key={i}>hi</h1>)
					) : (
						<p>No track data available</p>
					)}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Test;
