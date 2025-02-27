import Request, { IType } from "~lib/Request";
import type Response from "~lib/Response";

import base64ToArrayBuffer from "../base64toArrayBuffer";
import loadImage from "../loadImage";
import Filter from "./Filter";

// import tuna from "data-base64:~assets/logo-itv.png"

export default class ImageFilter extends Filter {
	private t0: number;
	constructor() {
		super();
		this.t0 = performance.now();
	}

	public async analyze(target: Element) {
		if (target.nodeName !== "IMG") {
			return;
		}

		const img = target as HTMLImageElement;
		const parentAnchor = img.closest("a"); // Find the closest <a> tag

		if (parentAnchor) {
			// Create a new <div> element to replace the <a> tag
			const div = document.createElement("div");
			div.setAttribute("disabled", "true");
			div.style.position = parentAnchor.style.position;
			div.style.display = parentAnchor.style.display;
			div.style.width = parentAnchor.style.width;
			div.style.height = parentAnchor.style.height;
			div.style.border = "2px solid black";

			// Copy any other styles or attributes as needed
			// For example:
			// div.style.cssText = parentAnchor.style.cssText;

			// Replace <a> tag with the new <div> tag
			parentAnchor.parentNode?.replaceChild(div, parentAnchor);

			// Move the image into the new <div> container
			div.appendChild(img);
		}

		// Create overlay image
		const overlay = document.createElement("img");
		overlay.src = chrome.runtime.getURL("assets/logo-itv.png");
		overlay.style.position = "absolute";
		overlay.style.top = "0";
		overlay.style.left = "0";
		overlay.style.width = "100%";
		overlay.style.height = "100%";
		overlay.style.backgroundColor = "#FFFFFF";

		overlay.style.zIndex = "1";
		overlay.style.pointerEvents = "none";

		// Create container for image and overlay
		const container = document.createElement("div");
		container.style.position = "relative";
		container.style.display = "inline-block";
		container.style.width = `${img.width}px`;
		container.style.height = `${img.height}px`;

		// Insert container into DOM and add image and overlay
		img.parentNode?.insertBefore(container, img);
		container.appendChild(img);
		container.appendChild(overlay);

		// Load image data
		const imgData = await loadImage(img.src);
		const req = new Request(IType.IMAGE, imgData, { url: img.src });

		chrome.runtime.sendMessage(req, (res: Response) => {
			if (!res) {
				img.style.border = "10px solid gray";
				return;
			}
			const { result } = res;
			const t1 = performance.now();
			if (result) {
				// If the image is NSFW, mark it as such
				// console.log(parentAnchor);
				console.log(
					{ img },
					" is nsfw - ",
					t1 - this.t0 + " milliseconds."
				);
			} else {
				// If the image is neutral, remove the overlay
				container.removeChild(overlay);
				console.log(
					{ img },
					" is neutral - ",
					t1 - this.t0 + " milliseconds."
				);
			}
		});
	}

	private analyzeImg(img: HTMLImageElement) {
		img.style.filter = "blur(25px)";
	}

	filter() {}
}
