// import type Request from "~lib/Request";
// import { IType } from "~lib/Request";
// import type Response from "~lib/Response";

// import Queue from "./Queue";

// class QueueWrapper extends Queue {
// 	public predictImage(
// 		imgData: number[],
// 		tabId: number,
// 		url?: string
// 	): Promise<boolean> {
// 		return new Promise((resolve, reject) => {
// 			if (this.cache.has(url)) {
// 				console.warn("cache hit");
// 				resolve(this.cache.get(url) as boolean);
// 				return;
// 			} else if (this.requestMap.has(url)) {
// 				console.warn("it is in queue");
// 				this.requestMap.get(url).push({ resolve, reject });
// 			} else {
// 				console.warn("add to queue");
// 				this.requestMap.set(url, [{ resolve, reject }]);
// 				this.add({
// 					type: IType.IMAGE,
// 					content: imgData,
// 					tabId,
// 					meta: {
// 						url
// 					}
// 				});
// 			}
// 		});
// 	}

// 	public predictText(content: string): Promise<boolean> {
// 		return new Promise((resolve, reject) => {
// 			resolve(true);
// 		});
// 	}
// }

// export default QueueWrapper;
