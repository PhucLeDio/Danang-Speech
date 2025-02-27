export default function base64ToArrayBuffer(base64) {
	const base64Data = base64.replace(/^data:image\/[a-zA-Z]*;base64,/, "");
	const byteCharacters = atob(base64Data);
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	// const byteArray = new Uint8Array(byteNumbers);
	// const image = new ImageData(byteArray, img.width, img.height);
	// return image;
	return byteNumbers;
}
