// import type Request from "~lib/Request";
// import { IType } from "~lib/Request";

// import type Model from "../models/Model";

// export type Task = {
// 	type: IType.IMAGE | IType.TEXT;
// 	content?: string | number[];
// 	tabId: number;
// 	meta?: Record<string, any>;
// };

// export type Result = {
// 	value: boolean;
// };

// export type QueueRequest = Array<{
// 	resolve: (value: boolean) => void;
// 	reject: (error: Error) => void;
// }>;

// // concurrent and prediction
// class Queue {
// 	public models: Model[];
// 	public timeout: number;

// 	private tasks: Task[];
// 	private running: boolean;

// 	protected cache: Map<string, boolean> = new Map();
// 	protected requestMap: Map<string, QueueRequest> = new Map();

// 	constructor(models: Model[], timeout: number) {
// 		this.models = models;
// 		this.timeout = timeout;
// 		this.running = false;

// 		this.tasks = [];
// 	}

// 	protected add(task: Task) {
// 		this.tasks.push(task);

// 		if (!this.running) {
// 			this.running = true;
// 			this.process();
// 		}
// 	}

// 	protected shift() {
// 		return this.tasks.shift();
// 	}

// 	// private next(task: Task) {}

// 	private async process() {
// 		const task = this.shift();
// 		console.info("I AM PROCESSING", task);
// 		// model predict
// 		const {
// 			type,
// 			content,
// 			tabId,
// 			meta: { url }
// 		} = task;
// 		if (type === IType.IMAGE) {
// 			try {
// 				const result = [];
// 				for (const model of this.models.filter(
// 					(model) => model.type === IType.IMAGE
// 				)) {
// 					const prediction = await model.process({
// 						imgData: content,
// 						tabId
// 					});
// 					result.push(prediction);
// 				}
// 				console.log("result", result);
// 				const prediction = result.some((result) => result);
// 				this.cache.set(url, prediction);
// 				this.requestMap
// 					.get(url)
// 					?.forEach(({ resolve }) => resolve(prediction));
// 			} catch (e) {
// 				this.requestMap.get(url)?.forEach(({ reject }) => reject(e));
// 			} finally {
// 				this.requestMap.delete(url);
// 			}
// 		} else if (type === IType.TEXT) {
// 		}

// 		console.log("REST", this.tasks.length);
// 		if (this.tasks.length > 0) {
// 			setTimeout(() => this.process(), this.timeout);
// 		} else {
// 			this.running = false;
// 		}
// 	}
// }

// export default Queue;
