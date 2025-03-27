import React, { useState } from "react";
import ReactDom from "react-dom";
import Icon from "react:assets/iconn.svg";
import "components/style/Volume.css";
import { findWord, genWordByN8N, saveWord } from "../../../api/api";
import ResultPopup from "./result";

export default function IconPopup(props) {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		await showResultPopup(props.mousePos, props.selectedText, setIsLoading);
	};

	return (
		<>
			<Icon
				onClick={handleClick}
				id="icon"
				style={{
					position: "absolute",
					background: "transparent",
					top: props.mousePos.y,
					left: props.mousePos.x + 10,
					zIndex: "10000000000"
				}}
			/>
			{isLoading && (
				<div className="fullscreen-loading">
					<div className="spinner" />
				</div>
			)}
		</>
	);
}

const showResultPopup = async (mousePos, selectedText, setIsLoading) => {
	try {
		let result = await findWord(selectedText);

		if (result === "word not found") {
			const word = await genWordByN8N(selectedText);
			const resSaveWord = await saveWord(word);
			word._id = resSaveWord.id_word;
			renderPopup(mousePos, selectedText, word);
		} else {
			renderPopup(mousePos, selectedText, result);
		}
	} catch (err) {
		console.error("Error while showing result popup:", err);
	} finally {
		setIsLoading(false);
	}
};

const renderPopup = (mousePos, selectedText, data) => {
	const container = document.createElement("div");
	ReactDom.render(
		<ResultPopup selectedText={selectedText} mousePos={mousePos} data={data} />,
		container
	);
	document.body.appendChild(container);

	const icon = document.querySelector("svg#icon");
	if (icon) icon.remove();
};
