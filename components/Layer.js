import React, { useState } from "react";

import StageHeader from "../components/StageHeader/StageHeader";
import Stage1 from "../components/Stage1/Stage1";
import Mispronounce from "./Stage2/Mispronounce";
import BtnLuuTu from "./images/BtnLuuTu.png";
import BtnPhatAm from "./images/BtnPhatAm.png";
import BtnTuyChon from "./images/BtnTuyChon.png";

const Layer = (props) => {
	const { choice, name, data } = props;
	const [activeLabel, setActiveLabel] = useState("ĐỘNG TỪ");
	const [showMispronounce, setShowMispronounce] = useState(false); // Toggle State

	const labels = [
		{
			text: "DANH TỪ",
			borderColor: "#3089D5",
			backgroundColor: "#FFF6C8",
			color: "#0083E1"
		},
		{
			text: "ĐỘNG TỪ",
			borderColor: "#3089D5",
			backgroundColor: "#FFF6C8",
			color: "#0083E1"
		},
		{
			text: "TÍNH TỪ",
			borderColor: "#3089D5",
			backgroundColor: "#FFF6C8",
			color: "#0083E1"
		}
	];

	const handleClick = (label) => {
		setActiveLabel(label);
	};

	const getText = () => {
		if (activeLabel === "DANH TỪ")
			return choice !== "data_2" ? data.noun[0] : data.noun;
		else if (activeLabel === "ĐỘNG TỪ")
			return choice !== "data_2" ? data.verb[0] : data.verb;
		else if (activeLabel === "TÍNH TỪ")
			return choice !== "data_2" ? data.adj[0] : data.adj;
	};

	const toggleMispronounce = () => {
		setShowMispronounce(!showMispronounce);
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
			}}>
			
			{/* Button Container (Positioned Absolutely to Move Higher) */}
			<div>
				{/* Left Buttons */}
				<button 
					onClick={() => alert("Danh sach luu words Button Clicked")}
					style={{
						position: "absolute",
						top: "-18px", left: "-5px", 
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						outline: "none"
					}}>
					<img src={BtnTuyChon} alt="Save Word" style={{ width: "35px", height: "35px" }} />
				</button>

				<button 
					onClick={toggleMispronounce} // Toggle Stage1 / Mispronounce
					style={{
						position: "absolute",
						top: "-18px", left: "30px", 
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						outline: "none"
					}}>
					<img src={BtnPhatAm} alt="Pronunciation" style={{ width: "35px", height: "35px" }} />
				</button>

				{/* Right Button */}
				<button 
					onClick={() => alert("Save word Clicked")}
					style={{
						position: "absolute",
						top: "-18px", right: "-10px", 
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						outline: "none"
					}}>
					<img src={BtnLuuTu} alt="Settings" style={{ width: "35px", height: "35px" }} />
				</button>
			</div>

			{/* Stage Header */}
			<StageHeader name={name} />

			{/* Toggle Between Stage1 and Mispronounce */}
			{showMispronounce ? <Mispronounce name={name} /> : (
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
