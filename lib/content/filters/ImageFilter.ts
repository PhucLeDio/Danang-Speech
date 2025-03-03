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


	private analyzeImg(img: HTMLImageElement) {
		img.style.filter = "blur(25px)";
	}

	filter() {}
}
