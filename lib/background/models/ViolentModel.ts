// import * as tf from "@tensorflow/tfjs";

// import { IType } from "~lib/Request";

// import getTopKClasses from "../getTopKClasses";
// import Model from "./Model";

// export default class ViolentModel extends Model {
// 	constructor(modelPath: string) {
// 		super(modelPath);

// 		this.name = "Violent Model";
// 		this.type = IType.IMAGE;
// 		this.IMG_SIZE = 224;

// 		this.loadModel();
// 	}

// 	protected async loadModel(): Promise<void> {
// 		console.log(`Loading ${this.name}...`);
// 		const startTime = performance.now();
// 		try {
// 			this.model = await tf.loadGraphModel(chrome.runtime.getURL("models/violence-model-mobilenetv3/model.json"));
// 			tf.tidy(() => {
// 				const prediction = this.model.predict(
// 					tf.zeros([1, 3,this.IMG_SIZE, this.IMG_SIZE])
// 				);
// 				// prediction.forEach((tensor) =>
// 				// 	tensor.data().then((data) => console.log(data))
// 				// );
// 				// prediction.data().then((data) => console.log(data));
// 			});

// 			const totalTime = Math.floor(performance.now() - startTime);
// 			console.log(`${this.name} loaded  in `, totalTime, "ms");
// 		} catch (e) {
// 			console.error(`Failed to load ${this.name}`, e);
// 		}
// 	}

// 	private async analyze(imageData: number[]) {
// 		return tf.tidy(() => {
// 			const imgData = new ImageData(this.IMG_SIZE, this.IMG_SIZE);
// 			imgData.data.set(new Uint8ClampedArray(imageData));
			
			
// 			const img = tf.browser.fromPixels(imgData)
// 			.resizeNearestNeighbor([224, 224])
// 			.toFloat()
// 			.div(tf.scalar(255)) // Normalize to [0, 1]
// 			.expandDims();
			
// 			// console.log(img.dataSync());

// 			const normalizedImg = img.sub(tf.tensor([0.485, 0.456, 0.406]))
//                            .div(tf.tensor([0.229, 0.224, 0.225]));

// 			// console.log(normalizedImg.dataSync());

// 			const trasposedImg = normalizedImg.transpose([0, 3, 1, 2]);
// 			// const imgTensor = tf.cast(
// 			// 	tf.browser.fromPixels(imgData),
// 			// 	"float32"
// 			// );


// 			// const offset = tf.scalar(127.5);
// 			// const normalized = imgTensor.sub(offset).div(offset);
// 			// const normalized = imgTensor.div(offset);

// 			// const normalized = imgTensor
// 			// 	.toFloat()
// 			// 	.div(tf.scalar(255)) as tf.Tensor3D;

// 			// let resized = normalized;
// 			// if (
// 			// 	imgTensor.shape[0] !== this.IMG_SIZE ||
// 			// 	imgTensor.shape[1] !== this.IMG_SIZE
// 			// ) {
// 			// 	resized = tf.image.resizeBilinear(
// 			// 		normalized,
// 			// 		[this.IMG_SIZE, this.IMG_SIZE],
// 			// 		true
// 			// 	);
// 			// }

// 			// const batched = resized.reshape([
// 			// 	1,
// 			// 	this.IMG_SIZE,
// 			// 	this.IMG_SIZE,
// 			// 	3
// 			// ]);

// 			// const batched = imgTensor.reshape([
// 			// 	1,
// 			// 	3,
// 			// 	this.IMG_SIZE,
// 			// 	this.IMG_SIZE,
// 			// ]);

// 			// this model is multi output, third output is the one we want (violent level)
// 			const predictions = this.model.predict(trasposedImg)
// 			return predictions;
// 		});
// 	}

// 	public process(payload: any): Promise<boolean> {
// 		return new Promise(async (resolve, reject) => {
// 			try {
// 				const { imgData: rawImgData, tabId } = payload;

// 				// the rawImgData after passing chrome.runtime is object like array
// 				// so we need to convert it back to arra
// 				const imgData = Object.values(rawImgData) as number[];
// 				const preds = await this.analyze(imgData);

// 				const violenceData = await preds[0].data();
// 				const humanData = await preds[1].data();

// 				// get the index of the highest value
// 				const violenceIndex = violenceData.indexOf(
// 					Math.max(...violenceData)
// 				);
// 				const humanIndex = humanData.indexOf(Math.max(...humanData));

// 				// const nonHumanScore = humanData[0];
// 				// const humanScore = humanData[1];
// 				// const nonViolenceScore = violenceData[0];
// 				// const violenceScore = violenceData[1];

// 				// console.log(violenceIndex, humanIndex);

// 				// console.log({
// 				// 	humanIndex,
// 				// 	violenceIndex,
// 				// 	nonHumanScore,
// 				// 	humanScore,
// 				// 	nonViolenceScore,
// 				// 	violenceScore,
// 				// 	preds,
// 				// 	imgData
// 				// });

// 				// const violenceResult = (
// 				// 	await tf.argMax(await preds[1].data()).data()
// 				// )[0];
// 				// const humanResult = (
// 				// 	await tf.argMax(await preds[0].data()).data()
// 				// )[0];

// 				// console.log({
// 				// 	humanResult: await preds[0].data(),
// 				// 	violenceResult: await preds[1].data()
// 				// });
// 				// if (violenceIndex + humanIndex === 2) {
// 				// if (humanScore + violenceScore > 1.5) {
// 				if (humanIndex == 1 && violenceIndex == 1) {
// 					resolve(true);
// 				} else {
// 					resolve(false);
// 				}

// 				// const result = await prediction.data();
// 				// const level = (await tf.argMax(result).data())[0];

// 				// if (level === 0) {
// 				// 	resolve(false);
// 				// } else {
// 				// 	resolve(true);
// 				// }
// 			} catch (e) {
// 				reject(e);
// 			}
// 		});
// 	}
// }