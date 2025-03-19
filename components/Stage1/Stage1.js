import React from "react";
import Label from "../Label";
import Example from "../Example";

const Stage1 = ({ activeLabel, labels, handleClick, getText }) => {
	return (
		<div
			style={{
				// border: "1px solid black",
				width: "550px",
				height: "360px",
				display: "flex",
				gap: "10px",
			}}>
			<div className="right column" style={{ width: "270px" }}>
				<div>
					<Label
						text={getText().defination}
						height={"130px"}
						width={"92%"}
						fontPadding={"10px"}
						fontSize={"20px"}
						fontWeight={"bold"}
						color={"#242C32"}
					/>
				</div>
				<div
					style={{
						paddingTop: "10px",
						display: "flex",
						gap: "4px",
					}}>
					{labels.map((label, index) => (
						<div
							key={index}
							onClick={() => handleClick(label.text)}
							style={{
								cursor: "pointer",
							}}>
							<Label
								text={label.text}
								alignContent={"center"}
								height={"35px"}
								width={"85px"}
								textAlign={"center"}
								backgroundColor={
									activeLabel === label.text ? "#0070D9" : label.backgroundColor
								}
								color={activeLabel === label.text ? "#FFF6C8" : label.color}
								boxShadow={"none"}
                                border={"2px solid #0070D9"}
							/>
						</div>
					))}
				</div>
				<div
					style={{
						paddingTop: "15px",
						display: "flex",
						gap: "15px",
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
			<div className="left column" style={{ width: "270px" }}>
				<div className="image_stage_1">
					<div
						style={{
							height: "350px",
							border: "3px solid #0070D9",
							borderRadius: "7px",
							paddingLeft: "7px",
							paddingRight: "7px",
							paddingTop: "5px",
						}}>
						<div style={{ paddingBottom: "10px" }}>
							<Label
								height={"60px"}
								width={"90%"}
								fontPadding={"10px"}
								text={`<div style="display: inline-block; padding: 3px 15px; background-color: #0070D9; color: #FFF6C8; border-radius: 30px;">
									Ví dụ
								</div> ` + getText().example[0]}
								paddingLeft={"10px"}
								fontSize={"17.5px"}
								color={"#242C32"}
								fontWeight={"bold"}
							/>
						</div>
						<div
							style={{
								height: "270px",
								borderRadius: "10px",
							}}>
							{getText().img ? (
								<img
									src={getText().img}
									style={{
										height: "93%",
										width: "100%",
										objectFit: "cover",
										borderRadius: "10px",
									}}
								/>
							) : (
								<img
									src="https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg"
									style={{
										height: "90%",
										width: "100%",
										objectFit: "cover",
										borderRadius: "10px",
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stage1;
