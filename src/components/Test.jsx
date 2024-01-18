import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";

const Test = () => {
	const { register, handleSubmit } = useForm();
	const [loading, setLoading] = React.useState(false);

	const uploadFile = async (type, file) => {
		const data = new FormData();

		data.append("file", file);
		data.append("upload_preset", type === "audio" ? "audios_preset" : "videos_preset");

		try {
			let cloudName = "ddqogmklx";
			let resourceType = type === "audio" ? "audio" : "video";

			let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

			const res = await axios.post(api, data);
			const { secure_url } = res.data;
			console.log("secure_url", secure_url);
			return secure_url;
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmit = async (data) => {
		try {
			setLoading(true);

			// Upload image file
			const audioUrl = await uploadFile("image", data.audio[0]);

			// Upload video file
			const videoUrl = await uploadFile("video", data.video[0]);

			// Send backend api request
			await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, { audioUrl, videoUrl });

			// Reset form
			console.log("File upload success!", audioUrl, videoUrl);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor="video">Video:</label>
					<br />
					<input type="file" accept="video/*" id="video" {...register("video")} />
				</div>
				<br />
				<div>
					<label htmlFor="img">Image:</label>
					<br />
					<input type="file" accept="audio/*" id="img" {...register("audio")} />
				</div>
				<br />
				<button type="submit">Upload</button>
			</form>

			{loading && (
				<ThreeDots
					height="80"
					width="80"
					radius="9"
					color="#4fa94d"
					ariaLabel="three-dots-loading"
					wrapperStyle={{}}
					wrapperClassName=""
					visible={true}
				/>
			)}
		</div>
	);
};

export default Test;
