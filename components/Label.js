import React from "react";

import "../components/style/Lable.css";

const Label = ({
	textAlign,
	text,
	height,
	fontSize,
	alignContent,
	fontPadding,
	color,
	width,
	paddingLeft,
	border,
	backgroundColor,
	boxShadow,
	fontWeight,
	cursor,
	maxHeight // Thêm maxHeight cho cuộn dọc
}) => {
	return (
		<div
			className="scrollable"
			style={{
				width: width || "100%",
				border: border || "1px solid #FFF6C8",
				height: height || "auto",
				maxHeight: maxHeight || height || "auto", // Giới hạn chiều cao để kích hoạt cuộn
				backgroundColor: backgroundColor || "#FFF6C8",
				borderRadius: "10px",
				textAlign: textAlign,
				alignContent: alignContent,
				// boxShadow:
				// 	boxShadow ||
				// 	"0 0 10px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5)",
				boxShadow: boxShadow || "0px 4px 10px rgba(0, 0, 0, 0.2)",
				paddingLeft: paddingLeft,
				color: color,
				fontWeight: fontWeight || "bold",
				fontSize: fontSize || "15px",
				padding: fontPadding,
				cursor: cursor,
				overflowY: "auto", // Chỉ kích hoạt cuộn dọc
				overflowX: "hidden" // Tắt cuộn ngang
			}}>
			{text ? (
				<span dangerouslySetInnerHTML={{ __html: text }}></span>
			) : (
				"Không có"
			)}
		</div>
	);
};

export default Label;
