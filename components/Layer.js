import React, { useState } from "react";
import StageHeader from "../components/StageHeader/StageHeader";
import Stage1 from "../components/Stage1/Stage1";
import Mispronounce from "../components/Stage2/Mispronounce";
import BtnLuuTu from "./images/BtnLuuTu.png";
import BtnPhatAm from "./images/BtnPhatAm.png";
import BtnTuyChon from "./images/BtnTuyChon.png";
import { useFirebase } from "../firebase/useFirebase";
import {findWord, saveDictionary} from "../api/api";

const Layer = (props) => {
	const { data } = props;
	const [activeLabel, setActiveLabel] = useState("ĐỘNG TỪ");
	const [showMispronounce, setShowMispronounce] = useState(false);
	const { user, isLoading, onLoginWithGoogle, onLogout } = useFirebase();

	const labels = [
		{ text: "DANH TỪ", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
		{ text: "ĐỘNG TỪ", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
		{ text: "TÍNH TỪ", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
	];

	const getText = () => {
		if (activeLabel === "DANH TỪ") return data?.noun || {};
		else if (activeLabel === "ĐỘNG TỪ") return data?.verb || {};
		else if (activeLabel === "TÍNH TỪ") return data?.adj || {};
	};

	const handleClick = (label) => {
		setActiveLabel(label);
	};

	const toggleMispronounce = () => {
		setShowMispronounce(!showMispronounce);
	};

	const saveDics = async () => {
		if (!user) {
			console.log("User is null, prompting login...");
			try {
				// do something => you need login and hidden extension



			} catch (e) {
				console.error("Login error:", e);
			}
		} else {
			/*
				* {
				* 	"id_user": "",
				* 	"word":  			=> "id"  (the next time)
				* }
				*
			*/

			// call api from file: api.ts

			console.log(data);
			await saveDictionary(user.uid, data._id);


		}
	};

	return (
		<div
			style={{
				position: "absolute",
				backgroundColor: "#FEF8E8",
				inset: "10px",
				backgroundImage: "linear-gradient(to top, #FFE4A4, #FEF8E8)",
				borderRadius: "20px",
				padding: "15px",
			}}
		>

			<div>
				<button
					onClick={() => alert("Danh sach luu words Button Clicked")}
					style={{
						position: "absolute",
						top: "-18px",
						left: "-5px",
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						outline: "none",
					}}
				>
					<img src={BtnTuyChon} alt="Save Word" style={{ width: "35px", height: "35px" }} />
				</button>

				<button
					onClick={toggleMispronounce}
					style={{
						position: "absolute",
						top: "-18px",
						left: "30px",
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						outline: "none",
					}}
				>
					<img src={BtnPhatAm} alt="Pronunciation" style={{ width: "35px", height: "35px" }} />
				</button>

				<button
					onClick={() => {
						alert("Save word Clicked");
						saveDics();
					}}
					style={{
						position: "absolute",
						top: "-18px",
						right: "-10px",
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						outline: "none",
					}}
				>
					<img src={BtnLuuTu} alt="Settings" style={{ width: "35px", height: "35px" }} />
				</button>
			</div>

			<StageHeader name={data.word} />
			{showMispronounce ? (
				<Mispronounce name={data.word} />
			) : (
				<Stage1
					activeLabel={activeLabel}
					labels={labels}
					handleClick={handleClick}
					getText={getText}
				/>
			)}
		</div>
	);
};

export default Layer;