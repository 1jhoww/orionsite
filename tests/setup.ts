import { vi } from "vitest";

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds = [0];

  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
Object.defineProperty(window, "scrollTo", { configurable: true, value: vi.fn() });
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
Object.defineProperty(window, "requestAnimationFrame", {
  configurable: true,
  value: (callback: FrameRequestCallback) => window.setTimeout(() => callback(performance.now()), 0),
});
Object.defineProperty(window, "cancelAnimationFrame", {
  configurable: true,
  value: (handle: number) => window.clearTimeout(handle),
});
