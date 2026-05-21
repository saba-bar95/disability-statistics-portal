import { describe, expect, it } from "vitest";
import {
  BAR_COLOR_FEMALE,
  BAR_COLOR_MALE,
  getSeriesColor,
  getSeriesDisplayLabel,
} from "./chartSeriesColors";

describe("getSeriesColor", () => {
  it("maps gendered series keys to blue and red", () => {
    expect(getSeriesColor("კაცი")).toBe(BAR_COLOR_MALE);
    expect(getSeriesColor("ქალი")).toBe(BAR_COLOR_FEMALE);
    expect(getSeriesColor("Man")).toBe(BAR_COLOR_MALE);
    expect(getSeriesColor("Woman")).toBe(BAR_COLOR_FEMALE);
  });

  it("uses social-security dual-series palette for charts 85–86", () => {
    expect(
      getSeriesColor("ოჯახი_შშმ_პირით", {
        sector: "social-security",
        recordId: 85,
      }),
    ).toBe(BAR_COLOR_MALE);
    expect(
      getSeriesColor("შშმ_პირი", {
        sector: "social-security",
        recordId: 86,
      }),
    ).toBe(BAR_COLOR_FEMALE);
  });
});

describe("getSeriesDisplayLabel", () => {
  it("localizes unit series keys", () => {
    expect(getSeriesDisplayLabel("unit", "en")).toBe("persons");
    expect(getSeriesDisplayLabel("ერთეული", "ka")).toBe("ერთეული");
  });

  it("formats social-security dual-series labels", () => {
    expect(
      getSeriesDisplayLabel("ოჯახი_შშმ_პირით", "ka", {
        sector: "social-security",
        recordId: 85,
      }),
    ).toBe("ოჯახი შშმ პირით");
  });
});
