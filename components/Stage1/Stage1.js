import React from "react";
import Label from "../Label";
import Example from "../Example";
import UpdatelatestImg from "/home/conanwinner/Desktop/_CODE/Danang-Speech/components/images/updatelatest.png"

/*
*
desc
desc_en
example
example_en
img
index_img_selected
synonym
* antonym
* */

const Stage1 = ({ activeLabel, labels, language, handleClick, getText }) => {
	const antonymList = {vie: "TRÁI NGHĨA", eng: "ANTONYM"}
	const synonymList = {vie: "ĐỒNG NGHĨA", eng: "SYNONYMOUS"}

	// return;
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
						text={getText().desc}
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
						textType={language === "VIE" ? synonymList.vie : synonymList.eng}
						TuNgu={getText().synonym}
					/>
					<Example
						textType={language === "VIE" ? antonymList.vie : antonymList.eng}
						TuNgu={getText().antonym}
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
								text={language === 'VIE' ? `<div style="display: inline-block; padding: 3px 15px; background-color: #0070D9; color: #FFF6C8; border-radius: 30px;">
									Ví dụ
								</div> ` + getText().example : `<div style="display: inline-block; padding: 3px 15px; background-color: #0070D9; color: #FFF6C8; border-radius: 30px;">
									Example
								</div> ` + getText().example}
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
									src={`https://vmdstorageimages.blob.core.windows.net/vmdimages/${getText().img}_1.jpg`}
									onError={(e) => {
										e.target.src = UpdatelatestImg;
									}}
									style={{
										height: "93%",
										width: "100%",
										objectFit: "cover",
										borderRadius: "10px",
									}}
								/>
							) : (
								<img
									src={UpdatelatestImg}
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
