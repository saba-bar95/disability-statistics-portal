/** i18n keys for chart Y-axis / title units, by sector + record ID. */
const SECTOR_RECORD_CHART_UNIT_KEYS = {
  healthcare: {
    4: "chartUnit_persons",
    5: "chartUnit_thousandGel",
    6: "chartUnit_persons",
    7: "chartUnit_persons",
    8: "chartUnit_persons",
  },
  education: {
    111: "chartUnit_persons",
    126: "chartUnit_persons",
  },
  "social-security": {
    82: "chartUnit_persons",
    83: "chartUnit_persons",
    84: "chartUnit_persons",
    85: "chartUnit_persons",
    86: "chartUnit_persons",
    90: "chartUnit_persons",
  },
  sport: {
    127: "chartUnit_persons",
  },
};

/** Fraction of Recharts’ auto bar width (per sector + record ID). */
const SECTOR_RECORD_CHART_BAR_WIDTH_RATIO = {
  education: {
    126: 0.8,
  },
  "social-security": {
    83: 0.8,
    84: 0.8,
    90: 0.8,
  },
};

/** i18n keys for chart titles (override API titles), by sector + record ID. */
const SECTOR_RECORD_CHART_TITLE_KEYS = {
  healthcare: {
    4: "healthcareChartTitle_4",
    5: "healthcareChartTitle_5",
    6: "healthcareChartTitle_6",
    7: "healthcareChartTitle_7",
    8: "healthcareChartTitle_8",
  },
  "social-security": {
    82: "socialSecurityChartTitle_82",
    83: "socialSecurityChartTitle_83",
    84: "socialSecurityChartTitle_84",
    85: "socialSecurityChartTitle_85",
    86: "socialSecurityChartTitle_86",
  },
  sport: {
    127: "sportChartTitle_127",
  },
};

/** Bar width as a fraction of Recharts default (e.g. 0.8), or undefined for full width. */
export function getRecordChartBarWidthRatio(sector, recordId) {
  if (sector == null || recordId == null) {
    return undefined;
  }
  return SECTOR_RECORD_CHART_BAR_WIDTH_RATIO[sector]?.[recordId];
}

/** Returns i18n key for chart unit (e.g. chartUnit_persons), or null. */
export function getRecordChartUnitKey(sector, recordId) {
  if (sector == null || recordId == null) {
    return null;
  }
  return SECTOR_RECORD_CHART_UNIT_KEYS[sector]?.[recordId] ?? null;
}

/** Returns i18n key for chart title override, or null. */
export function getRecordChartTitleKey(sector, recordId) {
  if (sector == null || recordId == null) {
    return null;
  }
  return SECTOR_RECORD_CHART_TITLE_KEYS[sector]?.[recordId] ?? null;
}

function getRecordApiTitle(record, lang) {
  return lang === "en"
    ? (record?.title_eng ?? record?.title_geo ?? "")
    : (record?.title_geo ?? record?.title_eng ?? "");
}

/** Title with unit in parentheses when configured for this record. */
export function getRecordChartDisplayTitle(record, sector, lang, translate) {
  const titleKey = getRecordChartTitleKey(sector, record?.ID);
  let title = getRecordApiTitle(record, lang);
  if (titleKey) {
    const translated = translate(titleKey);
    if (translated && translated !== titleKey) {
      title = translated;
    }
  }

  const unitKey = getRecordChartUnitKey(sector, record?.ID);
  if (!unitKey) {
    return title;
  }

  const unit = translate(unitKey);
  if (!unit || unit === unitKey) {
    return title;
  }

  return `${title} (${unit})`;
}
