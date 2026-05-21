/** Bar fill for male / boy series (Georgian + English API labels). */
export const BAR_COLOR_MALE = "#2563eb";

/** Bar fill for female / girl series (Georgian + English API labels). */
export const BAR_COLOR_FEMALE = "#dc2626";

const FEMALE_PATTERN =
  /ქალი|გოგო|woman|women|girl|girls|female|females|woman\b/i;
const MALE_PATTERN =
  /კაცი|კაცები|ბიჭ|ბიჭი|man|men|boy|boys|male|males|\bman\b/i;
const PERSONS_UNIT_PATTERN = /^unit$|^ერთეული$/i;

/** Social-security charts 4–5: dual series (KA + EN API keys). */
const SOCIAL_SECURITY_BLUE_SERIES = new Set([
  "ოჯახი_შშმ_პირით",
  "family_with_disabilities_Persons",
]);
const SOCIAL_SECURITY_RED_SERIES = new Set([
  "შშმ_პირი",
  "disabilities_Persons",
]);

/** Legend/tooltip labels for social-security charts 4–5 (underscores → spaces). */
const SOCIAL_SECURITY_DUAL_SERIES_LABELS = {
  ოჯახი_შშმ_პირით: "ოჯახი შშმ პირით",
  შშმ_პირი: "შშმ პირი",
  family_with_disabilities_Persons: "family with disabilities Persons",
  disabilities_Persons: "disabilities Persons",
};

function isSocialSecurityDualSeriesChart(sector, recordId) {
  return sector === "social-security" && (recordId === 85 || recordId === 86);
}

/** Resolve bar/legend color from series name (`კაცი`, `ქალი`, Man, Woman, …). */
export function getSeriesColor(seriesKey, options = {}) {
  const key = String(seriesKey ?? "").trim();
  const { sector, recordId } = options;
  if (!key) {
    return "#37496d";
  }
  if (isSocialSecurityDualSeriesChart(sector, recordId)) {
    if (SOCIAL_SECURITY_BLUE_SERIES.has(key)) {
      return BAR_COLOR_MALE;
    }
    if (SOCIAL_SECURITY_RED_SERIES.has(key)) {
      return BAR_COLOR_FEMALE;
    }
  }
  if (FEMALE_PATTERN.test(key)) {
    return BAR_COLOR_FEMALE;
  }
  if (MALE_PATTERN.test(key)) {
    return BAR_COLOR_MALE;
  }
  if (PERSONS_UNIT_PATTERN.test(key)) {
    return BAR_COLOR_MALE;
  }
  return "#37496d";
}

/** Legend/tooltip label (API may use `unit` / `ერთეული` as the series key). */
export function getSeriesDisplayLabel(
  seriesKey,
  language = "ka",
  options = {},
) {
  const key = String(seriesKey ?? "").trim();
  if (PERSONS_UNIT_PATTERN.test(key)) {
    return language === "en" ? "persons" : "ერთეული";
  }
  if (isSocialSecurityDualSeriesChart(options.sector, options.recordId)) {
    const label = SOCIAL_SECURITY_DUAL_SERIES_LABELS[key];
    if (label) {
      return label;
    }
  }
  return key;
}
