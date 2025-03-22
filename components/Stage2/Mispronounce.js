import React from "react";
import Speak from "../Speak";
import Volume from "../Volume";
// import BTN from "../images/mic-speak.png";
import StageHeader2 from "./StageHeader2";

const Mispronounce = ({ name, language }) => {
	return (
		<div
			style={{
				width: "550px",
				height: "360px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				gap: "50px",
			}}>

			{/* Word pronounce */}

			<div
				style={{
					width: "550px",
					height: "140px",
					display: "flex",
					flexDirection: "column",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
					borderRadius: "20px",
				}}>
					<StageHeader2 isList={false} title={language === 'VIE' ? "Phát âm chính xác từ" : "Pronounce word correctly"} name={name} />
					<div style={{
						background: "#FFF6C8",
						height: "90px",
						width: "100%",
						borderBottomLeftRadius: "20px",
						borderBottomRightRadius: "20px",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
					}}>
						<div style={{
							height: "70%",
							width: "100%",
							borderRight: "1px solid #ABA6A6",
							fontSize: "30px",
							fontWeight: "bold",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						}}>{name}</div>
						<div style={{
							height: "70%",
							width: "100%",
							borderLeft: "1px solid #ABA6A6",
							fontSize: "30px",
							fontWeight: "bold",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						}}>{name}</div>
					</div>
				</div>

			{/* Example pronounce */}

			<div
				style={{
					width: "550px",
					height: "140px",
					display: "flex",
					flexDirection: "column",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
					borderRadius: "20px",
				}}>
					<StageHeader2 isList={false} title={language === 'VIE' ? "Phát âm chính xác câu" : "Pronounce the sentence correctly"} name={"Nhập câu vô đây (i guess so)"} />
					<div style={{
						background: "#FFF6C8",
						height: "90px",
						width: "100%",
						borderBottomLeftRadius: "20px",
						borderBottomRightRadius: "20px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						alignContent: "center",
					}}>
						<div style={{
							height: "100%",
							width: "80%",
							borderBottom: "1px solid #ABA6A6",
							borderBottomWidth: "40%",
							fontSize: "20px",
							fontWeight: "bold",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						}}>{name} đang đi trên thảm cỏ</div>
						<div style={{
							height: "100%",
							width: "80%",
							borderTop: "1px solid #ABA6A6",
							borderWidth: "40%",
							fontSize: "20px",
							fontWeight: "bold",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							alignContent: "center",
						}}>{name} đang đi trên thảm cỏ</div>
					</div>
				</div>
		</div>
	);
}

export default Mispronounce;