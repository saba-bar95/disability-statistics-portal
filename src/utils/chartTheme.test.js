import { describe, expect, it } from "vitest";
import { computeScaledBarSize, getRecordChartTheme } from "./chartTheme";

describe("computeScaledBarSize", () => {
  it("returns undefined when inputs are missing or invalid", () => {
    expect(computeScaledBarSize(0, 5)).toBeUndefined();
    expect(computeScaledBarSize(400, 0)).toBeUndefined();
    expect(computeScaledBarSize(400, 5, 0)).toBeUndefined();
  });

  it("scales bar width by category count and ratio", () => {
    const full = computeScaledBarSize(400, 4, 1);
    const narrow = computeScaledBarSize(400, 4, 0.8);
    expect(full).toBeTypeOf("number");
    expect(narrow).toBeLessThan(full);
    expect(narrow).toBeGreaterThanOrEqual(8);
  });
});

describe("getRecordChartTheme", () => {
  it("returns distinct tokens for light and dark", () => {
    const light = getRecordChartTheme(false);
    const dark = getRecordChartTheme(true);
    expect(light.axisFill).not.toBe(dark.axisFill);
    expect(light.gridStroke).not.toBe(dark.gridStroke);
  });
});
