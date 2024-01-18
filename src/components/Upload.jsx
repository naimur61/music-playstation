import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { Grid, Input, InputLabel, Paper, TextField } from "@mui/material";

const Upload = () => {
	const {
		register,
		handleSubmit,
		// reset,
		formState: { errors },
	} = useForm();
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
		<Paper elevation={6} sx={{ m: 5, p: "2rem" }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid rowSpacing={5} columnSpacing={5}>
					{/* Title */}
					<Grid item xs={12}>
						<InputLabel htmlFor="name">Title</InputLabel>
						<TextField
							fullWidth
							size="small"
							id="title"
							variant="outlined"
							{...register("title", { required: "Title field is empty" })}
						/>{" "}
						{errors.title && <small style={{ color: "red" }}>{errors.title?.message}</small>}
					</Grid>

					{/* Link  */}
					<Grid item xs={12}>
						<InputLabel htmlFor="link">Blog link</InputLabel>
						<TextField
							size="small"
							fullWidth
							id="title"
							variant="outlined"
							{...register("link", { required: "Link field is empty" })}
						/>{" "}
						{errors.link && <small style={{ color: "red" }}>{errors.link?.message}</small>}
					</Grid>

					{/* Image */}
					<Grid item xs={12}>
						<InputLabel htmlFor="file">Select your file.</InputLabel>

						<Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
							<Input type="file" id="file" {...register("file")} style={{ display: "none" }} size="large" />
						</Button>

						{errors.image && <small style={{ color: "red" }}> {errors.image?.message}</small>}
					</Grid>

					{/* Button  */}
					<Grid item xs={12}>
						<Button type="submit" variant="outlined" fullWidth sx={{ borderRadius: "3rem" }}>
							Upload
						</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
};

export default Upload;
