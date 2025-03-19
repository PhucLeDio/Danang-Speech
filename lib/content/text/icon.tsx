import React, {useState} from "react";
import ReactDom from "react-dom";
import Icon from "react:assets/iconn.svg";
import {findWord} from "../../../api/api";

import ResultPopup from "./result";

const findWordFunc = async (selectedText: string) => {
	return await findWord(selectedText);
};

export default function IconPopup(props) {
	return (
		<Icon
			onClick={() => showResultPopup(props.mousePos, props.selectedText)}
			id="icon"
			style={{
				position: "absolute",
				background: "white",
				top: props.mousePos.y,
				left: props.mousePos.x + 10,
				zIndex: "10000000000"
			}}
		/>
	);
}

const showResultPopup = async (mousePos, selectedText) => {
	let result = await findWordFunc(selectedText);
	console.log(selectedText);
	console.log(result);

	if (
		!result
	) {
		console.log("Dictionary do not have that word");
		const icon = document.querySelector("svg#icon");
		icon.remove();
	} else {
		const container = document.createElement("div");
		ReactDom.render(
			<ResultPopup selectedText={selectedText} mousePos={mousePos} data={result} />,
			container
		);
		document.body.appendChild(container);
		const icon = document.querySelector("svg#icon");
		icon.remove();
	}
}
