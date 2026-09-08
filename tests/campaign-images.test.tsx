import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CampaignHero } from "../src/components/CampaignHero";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

it("loads one photo ahead and crossfades only to a loaded photo", () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"] });
  const { container } = render(<MemoryRouter><CampaignHero /></MemoryRouter>);
  const photos = () => container.querySelectorAll<HTMLImageElement>(".industrial-hero-media img");
  expect(photos()).toHaveLength(1);
  act(() => vi.advanceTimersByTime(5000));
  expect(photos()).toHaveLength(1);

  fireEvent.load(photos()[0]);
  act(() => vi.advanceTimersByTime(250));
  expect(photos()).toHaveLength(2);
  expect(photos()[1].fetchPriority).not.toBe("high");
  act(() => vi.advanceTimersByTime(5000));
  expect(container.querySelector(".is-active img")).toBe(photos()[0]);

  fireEvent.load(photos()[1]);
  act(() => vi.advanceTimersByTime(5000));
  expect(container.querySelector(".is-active img")).toBe(photos()[1]);
  act(() => vi.advanceTimersByTime(250));
  expect(photos()).toHaveLength(3);
  fireEvent.load(photos()[2]);
  act(() => vi.advanceTimersByTime(250));
  expect(photos()).toHaveLength(3);
});

it("continues loading past a failed upcoming photo without hiding the visible photo", () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"] });
  const { container } = render(<MemoryRouter><CampaignHero /></MemoryRouter>);
  const photos = () => container.querySelectorAll<HTMLImageElement>(".industrial-hero-media img");
  fireEvent.load(photos()[0]);
  act(() => vi.advanceTimersByTime(250));
  fireEvent.error(photos()[1]);
  act(() => vi.advanceTimersByTime(250));
  expect(photos()).toHaveLength(3);
  expect(container.querySelector(".is-active img")).toBe(photos()[0]);
});

