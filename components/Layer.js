import React, { useState } from "react";

import Example from "../components/Example";
import Label from "../components/Label";
import Speak from "../components/Speak";
import Volume from "../components/Volume";

const Layer = (props) => {
	const { choice, name, data } = props;
	const [activeLabel, setActiveLabel] = useState("ĐỘNG TỪ");
	const labels = [
		{
			text: "DANH TỪ",
			borderColor: "#FFB905",
			backgroundColor: "#FFFFFF",
			color: "#0083E1"
		},
		{
			text: "ĐỘNG TỪ",
			borderColor: "#FFB905",
			backgroundColor: "#FFFFFF",
			color: "#0083E1"
		},
		{
			text: "TÍNH TỪ",
			borderColor: "#FFB905",
			backgroundColor: "#FFFFFF",
			color: "#0083E1"
		}
	];
	const handleClick = (label) => {
		setActiveLabel(label);
	};

	const getText = () => {
		if (activeLabel === "DANH TỪ")
			return choice != "data_2" ? data.noun[0] : data.noun;
		else if (activeLabel === "ĐỘNG TỪ")
			return choice != "data_2" ? data.verb[0] : data.verb;
		else if (activeLabel === "TÍNH TỪ")
			return choice != "data_2" ? data.adj[0] : data.adj;
	};

	if (choice != "data_2") {
		return (
			<div
				style={{
					position: "absolute",
					backgroundColor: "#FEF8E8",
					inset: "10px",
					backgroundImage:
						"linear-gradient(to top, #FFE4A4, #FEF8E8)",
					borderRadius: "20px"
				}}>
				<div
					style={{
						padding: "15px",
						display: "flex",
						gap: "10px",
						height: "460px"
					}}>
					<div style={{ width: "280px" }}>
						<div>
							<Label
								textAlign={"center"}
								text={name}
								height={"70px"}
								fontSize={"45px"}
								alignContent={"center"}
								color={"#FFDB5A"}
							/>
						</div>
						<div style={{ paddingTop: "15px" }}>
							<Label
								text={getText().defination}
								height={"130px"}
								width={"93%"}
								fontPadding={"10px"}
								fontSize={"20px"}
								fontWeight={"lighter"}
								color={"#FFFFFF"}
							/>
						</div>
						<div
							style={{
								paddingTop: "15px",
								display: "flex",
								gap: "4px"
							}}>
							{labels.map((label, index) => (
								<div
									key={index}
									onClick={() => handleClick(label.text)}
									style={{ cursor: "pointer" }}>
									<Label
										text={label.text}
										alignContent={"center"}
										height={"35px"}
										width={"87px"}
										textAlign={"center"}
										border={
											activeLabel === label.text
												? `3px solid ${label.borderColor}`
												: "none"
										}
										backgroundColor={label.backgroundColor}
										color={label.color}
										boxShadow={"none"}
									/>
								</div>
							))}
						</div>
						<div
							style={{
								paddingTop: "15px",
								display: "flex",
								gap: "15px"
							}}>
							<Example
								textType={"ĐỒNG NGHĨA"}
								TuNgu={getText().synonyms.join(", ")}
							/>
							<Example
								textType={"TRÁI NGHĨA"}
								TuNgu={getText().antonyms.join(", ")}
							/>
						</div>
					</div>
					<div style={{ width: "320px" }}>
						<div style={{}}>
							<div
								style={{
									height: "340px",
									border: "3px solid #FFB800",
									borderRadius: "7px",
									paddingLeft: "7px",
									paddingRight: "7px",
									paddingTop: "5px"
								}}>
								<div style={{ paddingBottom: "5px" }}>
									<Label
										height={"60px"}
										width={"90%"}
										fontPadding={"10px"}
										backgroundColor={"#A83D00"}
										border={"2px solid #FFB800"}
										text={"Ví dụ: " + getText().example[0]}
										paddingLeft={"10px"}
										fontSize={"17.5px"}
										color={"#FFFFFF"}
										fontWeight={"normal"}
									/>
								</div>
								<div
									style={{
										height: "270px",
										borderRadius: "10px"
									}}>
									{getText().img ? (
										<img
											src={getText().img}
											style={{
												height: "90%",
												width: "100%",
												objectFit: "cover",
												borderRadius: "10px"
											}}
										/>
									) : (
										<img
											src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
											style={{
												height: "90%",
												width: "100%",
												objectFit: "cover",
												borderRadius: "10px"
											}}
										/>
									)}
								</div>
							</div>
						</div>
						<div style={{ height: "38px" }}>
							<Volume name={name} />
						</div>
						<div
							style={{
								height: "38px",
								paddingTop: "15px"
							}}>
							<Speak name={name} />
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div
				style={{
					position: "absolute",
					backgroundColor: "#FEF8E8",
					inset: "10px",
					backgroundImage:
						"linear-gradient(to top, #FFE4A4, #FEF8E8)",
					borderRadius: "20px"
				}}>
				<div
					style={{
						padding: "15px",
						display: "flex",
						gap: "10px",
						height: "460px"
					}}>
					<div style={{ width: "280px" }}>
						<div>
							<Label
								textAlign={"center"}
								text={name}
								height={"70px"}
								fontSize={"45px"}
								alignContent={"center"}
								color={"#FFDB5A"}
							/>
						</div>
						<div style={{ paddingTop: "15px" }}>
							<Label
								text={getText().desc}
								height={"130px"}
								width={"93%"}
								fontPadding={"10px"}
								fontSize={"20px"}
								fontWeight={"lighter"}
								color={"#FFFFFF"}
							/>
						</div>
						<div
							style={{
								paddingTop: "15px",
								display: "flex",
								gap: "4px"
							}}>
							{labels.map((label, index) => (
								<div
									key={index}
									onClick={() => handleClick(label.text)}
									style={{ cursor: "pointer" }}>
									<Label
										text={label.text}
										alignContent={"center"}
										height={"35px"}
										width={"87px"}
										textAlign={"center"}
										border={
											activeLabel === label.text
												? `3px solid ${label.borderColor}`
												: "none"
										}
										backgroundColor={label.backgroundColor}
										color={label.color}
										boxShadow={"none"}
									/>
								</div>
							))}
						</div>
						<div
							style={{
								paddingTop: "15px",
								display: "flex",
								gap: "15px"
							}}>
							<Example
								textType={"ĐỒNG NGHĨA"}
								TuNgu={getText().synonym}
							/>
							<Example
								textType={"TRÁI NGHĨA"}
								TuNgu={getText().antonym}
							/>
						</div>
					</div>
					<div style={{ width: "320px" }}>
						<div style={{}}>
							<div
								style={{
									height: "340px",
									border: "3px solid #FFB800",
									borderRadius: "7px",
									paddingLeft: "7px",
									paddingRight: "7px",
									paddingTop: "5px"
								}}>
								<div style={{ paddingBottom: "5px" }}>
									<Label
										height={"60px"}
										width={"90%"}
										fontPadding={"10px"}
										backgroundColor={"#A83D00"}
										border={"2px solid #FFB800"}
										text={"Ví dụ: " + getText().example}
										paddingLeft={"10px"}
										fontSize={"17.5px"}
										color={"#FFFFFF"}
										fontWeight={"normal"}
									/>
								</div>
								<div
									style={{
										height: "270px",
										borderRadius: "10px"
									}}>
									{getText().img ? (
										<img
											src={getText().img}
											style={{
												height: "90%",
												width: "100%",
												objectFit: "cover",
												borderRadius: "10px"
											}}
										/>
									) : (
										<img
											src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
											style={{
												height: "90%",
												width: "100%",
												objectFit: "cover",
												borderRadius: "10px"
											}}
										/>
									)}
								</div>
							</div>
						</div>
						<div style={{ height: "38px" }}>
							<Volume name={name} />
						</div>
						<div
							style={{
								height: "38px",
								paddingTop: "15px"
							}}>
							<Speak name={name} />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Layer;
