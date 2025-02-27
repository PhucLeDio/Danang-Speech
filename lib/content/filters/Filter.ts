import type Request from "~lib/Request";

export interface IFilter {
	analyze: (target: any) => Promise<any>;
	filter: () => void;
}

export default class Filter implements IFilter {
	public async analyze(target: any) {}

	filter() {}
}
