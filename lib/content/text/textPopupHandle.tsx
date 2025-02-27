import React from "react";
import ReactDom from "react-dom"
import IconPopup from "./icon";

function getSelectedText(): string {
	var selectedText: string = window
		.getSelection()
		.toString()
		.trim()
		.toLowerCase();
	return selectedText;
}

function popupIcon(event) {

  let mousePos = {
    x: event.clientX + window.scrollX,
    y: event.clientY + window.scrollY
  };

  const iconCheck = document.querySelector("svg#icon")
  const resultCheck = document.querySelector("div#result");

  if (
		resultCheck &&
		resultCheck !== event.target &&
		!resultCheck.contains(event.target as Node)
	) {
		resultCheck.remove();
	}

	if (
		iconCheck &&
		iconCheck !== event.target &&
		!iconCheck.contains(event.target as Node)
	) {
		iconCheck.remove();
	}

  if (getSelectedText() && getSelectedText().length > 0) {
    let selectedText = getSelectedText();
    // Create a container element
    const container = document.createElement("div");
    ReactDom.render(<IconPopup selectedText={selectedText} mousePos={mousePos} />, container);
    // Append the container to the body
    document.body.appendChild(container);

    console.log(event);
    console.log(getSelectedText());
  }
}

export function initTextPopup() {
  document.addEventListener("mouseup", popupIcon);
}
