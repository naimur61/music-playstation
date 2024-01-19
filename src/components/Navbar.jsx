import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import logo from "../asset/headphone.png";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/*-------------------Search bar Style ----------------------*/
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("xs")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));
/*-------------------Search bar Style ----------------------*/

export default function Navbar({ setLoading, setTracks }) {
	const navigate = useNavigate();
	const [searchText, setSearchText] = useState("");
	const [searchTerm, setSearchTerm] = useState(null);

	const handleSearchInputChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleSearchSubmit = () => {
		setSearchTerm(searchText);
		console.log(searchText);
	};

	// Data fetching
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					searchTerm
						? `http://localhost:5000/api/v1/music?searchTerm=${searchTerm}`
						: "http://localhost:5000/api/v1/music"
				);
				setTracks(response.data);
				console.log(response.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [searchTerm, setLoading, setTracks]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
						onClick={() => {
							navigate("/");
						}}
					>
						<Box component="img" src={logo} width="30px" height="30px" />
					</IconButton>
					<Typography
						variant="h6"
						xs="none"
						noWrap
						component="div"
						sx={{ display: { xs: "none", sm: "block" } }}
					>
						Music Track
					</Typography>

					{/* Search bar section  */}
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
							value={searchText}
							onChange={handleSearchInputChange}
							onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />

					{/* upload section  */}
					<Box>
						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-haspopup="true"
							onClick={() => {
								navigate("/upload");
							}}
							color="inherit"
						>
							<CloudUploadIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
