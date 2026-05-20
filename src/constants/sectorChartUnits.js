/** i18n keys for chart Y-axis / title units, by sector + record ID. */
const SECTOR_RECORD_CHART_UNIT_KEYS = {
  healthcare: {
    4: "chartUnit_persons",
    5: "chartUnit_thousandGel",
    6: "chartUnit_persons",
    7: "chartUnit_persons",
    8: "chartUnit_persons",
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
};

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
