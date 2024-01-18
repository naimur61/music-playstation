import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { ThreeDots } from "react-loader-spinner";
import { Input, Paper, Stack } from "@mui/material";

const Upload = () => {
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

			// Upload file
			const fileUrl = await uploadFile("file", data.file[0]);

			// Send backend api request
			await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/api/videos`, {
				fileUrl,
			});

			// Reset form
			console.log("File upload success!", fileUrl);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Stack justifyContent="center" mt="3rem">
			<Paper elevation={6} sx={{ mx: "auto", p: "2rem" }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="file">Upload Video/Audio:</label>
					<br />
					<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
						Upload your file
						<Input type="file" id="file" {...register("file")} style={{ display: "none" }} />
					</Button>

					<br />
					<button type="submit">Upload</button>
				</form>
			</Paper>

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
		</Stack>
	);
};

export default Upload;
