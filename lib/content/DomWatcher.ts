import Request, { IType } from "~lib/Request";
import type IFilter from "./filters/Filter";

export type IDOMWatcher = {
  watch: () => void;
  unwatch: () => void;
  rewatch: () => void;
};

export default class DOMWatcher implements IDOMWatcher {
  private readonly observer: MutationObserver;
  private readonly filter: IFilter;
  private debounceTimeout: number | null = null;
  private imageQueue: HTMLImageElement[] = [];
  private maxConcurrentAnalyses: number = 1;
  private currentAnalyses: number = 0;

  constructor(filter: IFilter) {
    this.filter = filter;
    this.observer = new MutationObserver(this.callback.bind(this));
  }

  public watch(): void {
    this.observer.observe(document, DOMWatcher.getConfig());
  }

  public unwatch(): void {
    this.observer.disconnect();
  }

  public rewatch(): void {
    this.unwatch();
    this.watch();
  }

  private async callback(mutationsList: MutationRecord[]) {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.queueImagesForAnalysis(node as Element);
          }
        });
      } else if (mutation.type === 'attributes') {
        this.checkAttributeMutation(mutation);
      }
    });

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = window.setTimeout(() => this.processImageQueue(), 10);
    // this.processImageQueue()
  }

  private queueImagesForAnalysis(element: Element): void {
    const images = element.getElementsByTagName("img");
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img.className === "YQ4gaf" && !img.hasAttribute('data-analyzed')) {
        this.imageQueue.push(img);
        img.setAttribute('data-analyzed', 'queued');
      }
    }
  }

  private checkAttributeMutation(mutation: MutationRecord): void {
    const target = mutation.target as HTMLImageElement;
    if (target.nodeName === "IMG" && target.className === "YQ4gaf" && !target.hasAttribute('data-analyzed')) {
      this.imageQueue.push(target);
      target.setAttribute('data-analyzed', 'queued');
    }
  }

  private async processImageQueue(): Promise<void> {
    while (this.imageQueue.length > 0 && this.currentAnalyses < this.maxConcurrentAnalyses) {
      const img = this.imageQueue.shift();
      if (img) {
        this.currentAnalyses++;
        img.setAttribute('data-analyzed', 'true');
        this.filter.analyze(img).finally(() => {
          this.currentAnalyses--;
          this.processImageQueue();
        });
      }
    }
  }

  private static getConfig(): MutationObserverInit {
    return {
      subtree: true,
      childList: true,
      attributes: true,
      // attributeFilter: ["src", "class"]
    };
  }
}