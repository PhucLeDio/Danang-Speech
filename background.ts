// import NSFWModel from "~lib/background/models/NSFWModel";
// import ViolentModel from "~lib/background/models/ViolentModel";
// import QueueWrapper from "~lib/background/queue/QueueWrapper";
// import Request, { IType } from "~lib/Request";
// import Response from "~lib/Response";

// const nsfwModel = new NSFWModel("../../models/nsfw-mobilenet/model.json");
// const violentModel = new ViolentModel("../../models/violence-model/model.json");
// const queue = new QueueWrapper([violentModel, nsfwModel], 100);

// chrome.runtime.onMessage.addListener(
// 	async (message: Request, sender, sendResponse) => {
// 		const tabId = sender.tab.id;

// 		try {
// 			if (message.type === IType.IMAGE) {
// 				const prediction = await queue.predictImage(
// 					// message.payload as string,
// 					message.payload,
// 					tabId,
// 					message.meta?.url
// 				);
// 				sendResponse(new Response(prediction));
// 			}
// 		} catch (e) {
// 			console.error(e);
// 			sendResponse(undefined);
// 		}
// 	}
// );

// const init = async () => {
// 	/**
// 	 * What action to take when someone clicks the right-click menu option.
// 	 * Here it takes the url of the right-clicked image and the current tabId, and
// 	 * send them to the content script where the ImageData will be retrieved and
// 	 * sent back here. After that, imageClassifier's analyzeImage method.
// 	 */
// 	async function clickMenuCallback(info, tab) {
// 		const message = { action: "IMAGE_CLICKED", url: info.srcUrl };
// 		const prediction = await queue.predictImage(info.srcUrl, tab.id);
// 		console.log({ prediction });
// 	}

// 	/**
// 	 * Adds a right-click menu option to trigger classifying the image.
// 	 * The menu option should only appear when right-clicking an image.
// 	 */
// 	chrome.runtime.onInstalled.addListener(() => {
// 		chrome.contextMenus.create({
// 			id: "contextMenu0",
// 			title: "Classify NSFW content",
// 			contexts: ["image"]
// 		});
// 	});

// 	chrome.contextMenus.onClicked.addListener(clickMenuCallback);
// };

// init();
