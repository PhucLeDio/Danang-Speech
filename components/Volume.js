import React, { useRef, useState } from "react";

import BTN from "../components/images/Sound.png";

import "../components/style/Volume.css";

const Volume = (props) => {
	const [speed, setSpeed] = useState(1.0);
	// get text
	const { name, isLabel } = props;
	const audioRef = useRef(null);

	const [selected, setSelected] = useState("VIE");

	const requestViettelAI = async (voice) => {
		let voiceCode = "";
		switch (voice) {
			case "Northern Woman":
				voiceCode = "hn-quynhanh";
				break;
			case "Central Woman":
				voiceCode = "hue-maingoc";
				break;
			case "Southern Woman":
				voiceCode = "hcm-diemmy";
				break;
			case "Northern Man":
				voiceCode = "hn-thanhtung";
				break;
			case "Central Man":
				voiceCode = "hue-baoquoc";
				break;
			default:
				voiceCode = "hcm-minhquan";
		}

		const token = "7c93af3fac24ec2c05033833e8896b4c"; // Token
		const url = "https://viettelai.vn/tts/speech_synthesis";

		const payload = {
			text: name,
			voice: voiceCode,
			speed,
			tts_return_option: 2,
			token,
			without_filter: true
		};

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});

			console.log("response: ", response);

			if (response.ok) {
				const blob = await response.blob();
				const audioUrl = URL.createObjectURL(blob);
				if (audioRef.current) {
					audioRef.current.src = audioUrl;
					audioRef.current.play();
				}
			} else {
				alert("Failed to generate audio. Please try again.");
			}
		} catch (error) {
			console.error("Error generating audio:", error);
			alert("An error occurred while generating audio.");
		}
	};

	return (
		isLabel ? (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					gap: "10px",
				}}
			>
				{/* Nút âm thanh */}
				<div style={{ width: "60px" }}>
					<img
						src={BTN}
						width={40}
						height={40}
						alt="Button Sounds"
						onClick={() => requestViettelAI("Northern Woman")}
						style={{ cursor: "pointer" }}
					/>
				</div>

				{/* Thanh trượt để điều chỉnh tốc độ */}
				{/* <input
			  type="range"
			  min={0.8}
			  max={1.2}
			  step={0.1}
			  value={speed}
			  onChange={(e) => {
				setSpeed(Number(e.target.value));
				console.log("Speed: ", e.target.value);
			  }}
			  className="custom-range"
			  style={{
				width: "180px",
				height: "20px",
			  }}
			/> */}

				{/* Chuyển đổi giữa tiếng Việt và tiếng Anh */}
				<div
					style={{
						display: "flex",
						borderRadius: "15px",
						backgroundColor: "#FFF6C8",
						border: "2px solid #0070D9",
						overflow: "hidden",
						width: "160px",
						cursor: "pointer",
					}}
				>
					<div
						onClick={() => setSelected("VIE")}
						style={{
							flex: 1,
							textAlign: "center",
							padding: "10px",
							backgroundColor: selected === "VIE" ? "#0070D9" : "#FFF6C8",
							color: selected === "VIE" ? "white" : "#0070D9",
							fontWeight: "bold",
							transition: "all 0.3s ease",
						}}
					>
						VIE
					</div>
					<div
						onClick={() => setSelected("ENG")}
						style={{
							flex: 1,
							textAlign: "center",
							padding: "10px",
							backgroundColor: selected === "ENG" ? "#0070D9" : "#FFF6C8",
							color: selected === "ENG" ? "white" : "#0070D9",
							fontWeight: "bold",
							transition: "all 0.3s ease",
						}}
					>
						ENG
					</div>
				</div>

				<audio ref={audioRef} style={{ display: "none" }}></audio>
			</div>
		) : (
			// Nút âm thanh
			<div style={{
				width: "60px",
				paddingTop: "5px",
				paddingBottom: "5px",
				marginLeft: "6px", }}>
				<img
					src={BTN}
					width={43}
					height={43}
					alt="Button Sounds"
					onClick={() => requestViettelAI("Northern Woman")}
					style={{ cursor: "pointer" }}
				/>
			</div>
		)
	);
};

export default Volume;