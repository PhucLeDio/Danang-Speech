// import * as tf from "@tensorflow/tfjs";

// import { NSFW_CLASSES } from "./models/NSFWModel";

// const getTopKClasses = async (logits: tf.Tensor2D, topK = 5) => {
// 	const values = await logits.data();

// 	const valuesAndIndices = [];
// 	for (let i = 0; i < values.length; i++) {
// 		valuesAndIndices.push({ value: values[i], index: i });
// 	}
// 	valuesAndIndices.sort((a, b) => {
// 		return b.value - a.value;
// 	});
// 	const topkValues = new Float32Array(topK);
// 	const topkIndices = new Int32Array(topK);
// 	for (let i = 0; i < topK; i++) {
// 		topkValues[i] = valuesAndIndices[i].value;
// 		topkIndices[i] = valuesAndIndices[i].index;
// 	}

// 	const topClassesAndProbs = [];
// 	for (let i = 0; i < topkIndices.length; i++) {
// 		topClassesAndProbs.push({
// 			className: NSFW_CLASSES[topkIndices[i]],
// 			probability: topkValues[i]
// 		});
// 	}
// 	return topClassesAndProbs;
// };

// export default getTopKClasses;
