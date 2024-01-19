import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { Grid, Input, InputLabel, Paper, TextField } from "@mui/material";
import LoadingModal from "../Shared/LoadingModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Upload = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);

	const uploadFile = async (type, file) => {
		setLoading(true);
		const data = new FormData();

		data.append("file", file);
		data.append("upload_preset", type === "audio" ? "audios_preset" : "videos_preset");

		try {
			let cloudName = "ddqogmklx";
			let resourceType = type === "audio" ? "audio" : "video";

			let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

			const res = await axios.post(api, data);
			const { secure_url } = res.data;
			return secure_url;
		} catch (error) {
			console.error(error);
		}
	};

	const onSubmit = async (data) => {
		try {
			// Upload file
			const musicUrl = await uploadFile("file", data.file[0]);
			const tracks = {
				title: data.title,
				artist: data.artist,
				category: data.category,
				musicUrl,
			};

			if (musicUrl) {
				// Send backend api request
				sendToServer(tracks);
			} else {
				failedToast();
			}

			setLoading(false);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	// Send information to server
	const sendToServer = async (tracks) => {
		await fetch("https://playstation-server.onrender.com/api/v1/music/create-musicTrack", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(tracks),
		})
			.then((res) => res.json())
			.then((data) => {
				if ((data.statuscode === 200) | (data.success === true)) {
					console.log(data);
					setLoading(false);
					reset();
					successToast(data?.message);
					navigate("/");
				}
			});
	};

	// ToastyFye
	const successToast = (t) => {
		toast.success(t, {
			position: "top-center",
			autoClose: 1000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};
	const failedToast = () => {
		toast.error("File Uploaded Failed ~", {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};

	return (
		<div>
			<Paper elevation={6} sx={{ m: 5, p: "2rem" }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container spacing={1.5}>
						{/* Title */}
						<Grid item xs={12}>
							<InputLabel htmlFor="name">Title</InputLabel>
							<TextField
								fullWidth
								size="small"
								id="title"
								variant="outlined"
								{...register("title", { required: "Title is empty" })}
							/>{" "}
							{errors.title && (
								<small style={{ color: "red", fontWeight: "bold" }}>{errors.title?.message}</small>
							)}
						</Grid>

						{/* Artist Name  */}
						<Grid item xs={12}>
							<InputLabel htmlFor="artist">Artist Name</InputLabel>
							<TextField
								size="small"
								fullWidth
								id="artist"
								variant="outlined"
								{...register("artist", { required: "Artist Name is empty" })}
							/>{" "}
							{errors.artist && (
								<small style={{ color: "red", fontWeight: "bold" }}>{errors.artist?.message}</small>
							)}
						</Grid>

						{/* Category  */}
						<Grid item xs={12}>
							<InputLabel htmlFor="category">Category</InputLabel>
							<TextField
								size="small"
								fullWidth
								id="category"
								variant="outlined"
								{...register("category", { required: "Category is empty" })}
							/>{" "}
							{errors.category && (
								<small style={{ color: "red", fontWeight: "bold" }}>{errors.category?.message}</small>
							)}
						</Grid>

						{/* Image */}
						<Grid item xs={12}>
							<InputLabel htmlFor="file">Select your file.</InputLabel>
							<Button fullWidth component="label" variant="contained" startIcon={<CloudUploadIcon />}>
								<Input
									type="file"
									id="file"
									{...register("file", { required: "Selected file is empty" })}
									style={{ display: "none" }}
								/>
							</Button>
							{errors.file && (
								<small style={{ color: "red", fontWeight: "bold" }}>{errors.file?.message}</small>
							)}
						</Grid>

						{/* Button  */}
						<Grid item xs={12}>
							<Button type="submit" variant="outlined" fullWidth sx={{ borderRadius: "3rem", mt: "1rem" }}>
								Upload
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>

			<ToastContainer />
			{loading && <LoadingModal txt={"Your File is Uploading!"} />}
		</div>
	);
};

export default Upload;
