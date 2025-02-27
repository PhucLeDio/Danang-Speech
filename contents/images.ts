import type { PlasmoCSConfig } from "plasmo";

import DOMWatcher from "~lib/content/DomWatcher";
import ImageFilter from "~lib/content/filters/ImageFilter";
import loadImage from "~lib/content/loadImage";
import { initTextPopup } from "~lib/content/text/textPopupHandle";
import type Request from "~lib/Request";
import { IType } from "~lib/Request";

export const config: PlasmoCSConfig = {
	matches: ["<all_urls>"],
	all_frames: true,
	run_at: "document_start",
};

chrome.runtime.onMessage.addListener(
	async (message: Request, sender, sendResponse) => {
		if (!message) return;

		switch (message.type) {
			case IType.IMG_DATA:
				const imageData = await loadImage(message.payload);
				sendResponse(imageData);
				return true;
			default:
				break;
		}
	}
);

const init = async (): Promise<void> => {
	console.log("hello, wolrd [plugin]c");

	const imageFilter = new ImageFilter();
	const domWatcher = new DOMWatcher(imageFilter);

	domWatcher.watch();

	window.addEventListener('scroll', () => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		  domWatcher.rewatch();
		}
	  });
	  
};

if (window.self === window.top) {
	init();
	initTextPopup();
}
