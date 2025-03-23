import React, {useState} from "react";
import ReactDom from "react-dom";
import Icon from "react:assets/iconn.svg";
import {findWord, genWordByN8N, saveWord} from "../../../api/api";

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
	console.log(result);

	if (
		result == "word not found"
	) {

		// call api n8n find word

		let word = await genWordByN8N(selectedText);
		// call api execute save word not found
		let resSaveWord = await saveWord(word);
		console.log(resSaveWord);

		word._id = resSaveWord.id_word

		console.log(word);

		const container = document.createElement("div");
		ReactDom.render(
			<ResultPopup selectedText={selectedText} mousePos={mousePos} data={word} />,
			container
		);
		document.body.appendChild(container);
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
