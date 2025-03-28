import React, { useState } from "react";
import StageHeader from "../components/StageHeader/StageHeader";
import Stage1 from "../components/Stage1/Stage1";
import Mispronounce from "../components/Stage2/Mispronounce";
import BtnLuuTu from "./images/BtnLuuTu.png";
import BtnPhatAm from "./images/BtnPhatAm.png";
import BtnTuyChon from "./images/BtnTuyChon.png";
import BTNtudien from "./images/BTNtudien.png";
import BTNdictionary from "./images/BTNdictionary.png";
import BTNmieng from "./images/BTNmieng.png"
import { useFirebase } from "../firebase/useFirebase";
import {deleteDictionary, findDictionarysByIdUser, findWord, saveDictionary} from "../api/api";
import { FaTrashAlt } from "react-icons/fa";
import "../style.css"

const Layer = (props) => {
	const { data } = props;
	const [activeLabel, setActiveLabel] = useState("ĐỘNG TỪ");
	const [showMispronounce, setShowMispronounce] = useState(false);
	const [showSave, setShowSave] = useState(false);
	const [dataDictionarys, setDataDictionarys] = useState();
	const { user, isLoading, onLoginWithGoogle, onLogout } = useFirebase();

	const [tudien, setTudien] = useState(false);

	const [language, setLanguage] = useState("VIE");
	const [currentWordData, setCurrentWordData] = useState(data);

	const labels = [
		{ text: "DANH TỪ", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
		{ text: "ĐỘNG TỪ", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
		{ text: "TÍNH TỪ", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
	];

	const englabels = [
		{ text: "NOUN", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
		{ text: "VERB", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
		{ text: "ADJ", borderColor: "#3089D5", backgroundColor: "#FFF6C8", color: "#0083E1" },
	];

	const getText = () => {
		if (activeLabel === "DANH TỪ" || activeLabel === "NOUN") return currentWordData?.noun || {};
		else if (activeLabel === "ĐỘNG TỪ" || activeLabel === "VERB") return currentWordData?.verb || {};
		else if (activeLabel === "TÍNH TỪ" || activeLabel === "ADJ") return currentWordData?.adj || {};
	};

	const handleClick = (label) => {
		setActiveLabel(label);
	};

	const toggleTudien = () => {
		setTudien(!tudien);
	};

	const toggleSave = async () => {
		setDataDictionarys(await findDictionarysByIdUser(user.uid))
		setShowSave(!showSave);
		// setTudien(!tudien);
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
			await saveDictionary(user.uid, data._id, data.word);

		}
	};

	const handleBTNtudienClick = () => {
		setShowSave(false); // Hide the save section
		setShowMispronounce(false); // Ensure Mispronounce section is hidden
	};

	const handleBtnPhatAmClick = () => {
		setShowSave(false); // Hide the save section
		setTudien(!tudien); // Toggle Dictionary
		setShowMispronounce((prevState) => !prevState); // Toggle Mispronounce
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
					onClick={() => {user ? toggleSave() : alert("You are not sign in")}}
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
					onClick={handleBtnPhatAmClick}
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
					<img src={tudien === true ? BTNdictionary : BtnPhatAm} alt="Pronunciation" style={{ width: "35px", height: "35px" }} />
				</button>

				<button
					onClick={() => {
						!user ? alert("Please sign in to save word") : 
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

			{/*================== show lists have been saved ====================*/}
			{showSave ? (
				<>
					<StageHeader isList={true} name={currentWordData.word} language={language} setLanguage={setLanguage} />
					<div style={{
						width: "550px",
						height: "360px",
						border: "1px solid #0070D9",
						borderRadius: "20px",
						display: "flex",
						flexDirection: "column",
					}}>
						<div style={{
							width: "100%",
							height: "10%",
							backgroundColor: "#0070D9",
							borderTopLeftRadius: "20px",
							borderTopRightRadius: "20px",
						}}></div>

						<div style={{
							height: "288px",
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "10px",
							overflowY: "auto",
							overflowX: "hidden"
						}}>

							{dataDictionarys?.dics?.map((item, index) => (
								<div key={item.id_dics || index} style={{
									width: "90%",
									minHeight: "50px",
									display: "flex",
									alignItems: "center",
									borderBottom: "1px solid #ADAAAB",
									marginTop: "5px",
								}}>
									<div style={{ width: "10%", textAlign: "center" }}>
										<button
											style={{ background: "transparent", border: "none", cursor: "pointer" }}
											onClick={async () => {
												await deleteDictionary(user.uid, item.id_dics, item.word);
												setDataDictionarys(prev => ({
													...prev,
													dics: prev.dics.filter(dic => dic.id_dics !== item.id_dics)
												}));
											}}
										>
											<FaTrashAlt size={24} color="#0070D9" />
										</button>
									</div>

									<div style={{ width: "70%", fontWeight: "bold", fontSize: "25px" }}>
										{item.word}
									</div>

									<div style={{ width: "20%", display: "flex", justifyContent: "center", gap: "10px" }}>
										<button
											style={{ background: "transparent", border: "none", cursor: "pointer" }}
											onClick={async () => {
												const fullWordData = await findWord(item.word);
												setCurrentWordData(fullWordData);
												handleBTNtudienClick();
											}}
										>
											<img src={BTNtudien} alt="Dictionary" style={{ width: "40px", height: "40px" }} />
										</button>

										<button
											style={{ background: "transparent", border: "none", cursor: "pointer" }}
											onClick={async () => {
												const fullWordData = await findWord(item.word);
												setCurrentWordData(fullWordData);
												handleBtnPhatAmClick();
											}}
										>
											<img src={BTNmieng} alt="Pronunciation" style={{ width: "40px", height: "40px" }} />
										</button>
									</div>
								</div>
							))}



						</div>

						<div style={{
							width: "100%",
							height: "10%",
							backgroundColor: "#0070D9",
							borderBottomLeftRadius: "20px",
							borderBottomRightRadius: "20px",
						}}></div>
					</div>
				</>
			) : (
				<>
					<StageHeader isList={false} name={currentWordData.word} language={language} setLanguage={setLanguage} />
					{showMispronounce ? (
						<Mispronounce name={currentWordData} language={language} />
					) : (
						<Stage1
							activeLabel={activeLabel}
							labels={language === "VIE" ? labels : englabels}
							language={language}
							handleClick={handleClick}
							getText={getText}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Layer;
