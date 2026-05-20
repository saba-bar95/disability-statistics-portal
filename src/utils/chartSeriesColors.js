/** Bar fill for male / boy series (Georgian + English API labels). */
export const BAR_COLOR_MALE = "#2563eb";

/** Bar fill for female / girl series (Georgian + English API labels). */
export const BAR_COLOR_FEMALE = "#dc2626";

const FEMALE_PATTERN =
  /ქალი|გოგო|woman|women|girl|girls|female|females|woman\b/i;
const MALE_PATTERN = /კაცი|კაცები|ბიჭ|ბიჭი|man|men|boy|boys|male|males|\bman\b/i;

/** Resolve bar/legend color from series name (`კაცი`, `ქალი`, Man, Woman, …). */
export function getSeriesColor(seriesKey) {
  const key = String(seriesKey ?? "").trim();
  if (!key) {
    return "#37496d";
  }
  if (FEMALE_PATTERN.test(key)) {
    return BAR_COLOR_FEMALE;
  }
  if (MALE_PATTERN.test(key)) {
    return BAR_COLOR_MALE;
  }
  return "#37496d";
}
