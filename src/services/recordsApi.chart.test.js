import { describe, expect, it } from "vitest";
import { getChartYAxisMax, mergeRecordsById } from "./recordsApi";

describe("getChartYAxisMax", () => {
  it("returns a small default for non-positive data", () => {
    expect(getChartYAxisMax(0)).toBe(10);
    expect(getChartYAxisMax(-5)).toBe(10);
  });

  it("rounds up with modest headroom on real values", () => {
    expect(getChartYAxisMax(15036)).toBe(20000);
    expect(getChartYAxisMax(135000)).toBe(150000);
    expect(getChartYAxisMax(15036)).toBeGreaterThan(15036);
  });
});

describe("mergeRecordsById", () => {
  it("deduplicates records by ID across groups", () => {
    const merged = mergeRecordsById([
      [
        { ID: 1, title: "a" },
        { ID: 2, title: "b" },
      ],
      [
        { ID: 2, title: "b2" },
        { ID: 3, title: "c" },
      ],
    ]);
    expect(merged.map((r) => r.ID).sort()).toEqual([1, 2, 3]);
    expect(merged.find((r) => r.ID === 2).title).toBe("b2");
  });
});
