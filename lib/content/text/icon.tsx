import wordDict_2 from "assets/output_8k.json";
import wordDict from "assets/word.json";
import React from "react";
import ReactDom from "react-dom";
import Icon from "react:assets/iconn.svg";

import ResultPopup from "./result";

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

function searchWord(wordDict, selectedText) {
	return (typeof wordDict[selectedText] != "undefined") ? true : false;
}

function searchWordDict2(wordDict2, selectedText) {
	return wordDict2.find((item) => item.word === selectedText);
}

function showResultPopup(mousePos, selectedText) {
	let data_2 = searchWordDict2(wordDict_2, selectedText);
	if (
		!searchWord(wordDict, selectedText) &&
		typeof data_2 == "undefined"
	) {
		console.log("Dictionary do not have that word");
		const icon = document.querySelector("svg#icon");
		icon.remove();
	} else if (searchWord(wordDict, selectedText)) {
		const container = document.createElement("div");
		ReactDom.render(
			<ResultPopup selectedText={selectedText} mousePos={mousePos} />,
			container
		);
		document.body.appendChild(container);
		const icon = document.querySelector("svg#icon");
		icon.remove();
	} else if (!(typeof data_2 == "undefined")) {
		const container = document.createElement("div");
		ReactDom.render(
			<ResultPopup
				data_2={data_2}
				selectedText={selectedText}
				mousePos={mousePos}
			/>,
			container
		);
		document.body.appendChild(container);
		const icon = document.querySelector("svg#icon");
		icon.remove();
	}
}
