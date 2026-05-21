const FALLBACK_API_BASE_URL = "https://disability-api.geostat.ge/api";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || FALLBACK_API_BASE_URL;

export async function fetchRecordsByCategory(categoryId, lang = "ka") {
  const params = new URLSearchParams({ lang });
  const url = `${API_BASE_URL}/records/category/${categoryId}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch records for category ${categoryId}: ${response.status}`,
    );
  }

  return response.json();
}

export async function fetchRecordsByCategoryAndSubCategory(
  categoryId,
  subCategoryId,
  lang = "ka",
) {
  const params = new URLSearchParams({ lang });
  const url = `${API_BASE_URL}/records/${categoryId}/${subCategoryId}?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch records for category ${categoryId}, subcategory ${subCategoryId}: ${response.status}`,
    );
  }

  return response.json();
}

/** Merge record arrays and dedupe by ID. */
export function mergeRecordsById(recordGroups) {
  const byId = new Map();
  for (const group of recordGroups) {
    if (!Array.isArray(group)) {
      continue;
    }
    for (const record of group) {
      if (record?.ID != null) {
        byId.set(record.ID, record);
      }
    }
  }
  return [...byId.values()];
}

/** Unique sub_category ids from a category records payload. */
export function getUniqueSubCategoryIds(records) {
  if (!Array.isArray(records)) {
    return [];
  }
  return [...new Set(records.map((record) => record.sub_category))].sort(
    (a, b) => a - b,
  );
}

function coerceChartNumber(value) {
  if (value == null || value === "") {
    return 0;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  const parsed = Number(String(value).replace(/\s/g, "").replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

/** Ensure `year` stays as-is; all series values are finite numbers for Recharts. */
export function normalizeRecordChartData(chartData) {
  if (!Array.isArray(chartData)) {
    return [];
  }

  return chartData.map((row) => {
    if (!row || typeof row !== "object") {
      return { year: "" };
    }

    const normalized = {
      year: row.year ?? row.Year ?? "",
    };

    for (const [key, value] of Object.entries(row)) {
      if (key === "year" || key === "Year") {
        continue;
      }
      normalized[key] = coerceChartNumber(value);
    }

    return normalized;
  });
}

/** Max Y value across visible series (for axis domain). */
export function getChartDataMax(chartData, seriesKeys, visibleKeys = null) {
  let max = 0;

  for (const row of chartData) {
    for (const key of seriesKeys) {
      if (visibleKeys && !visibleKeys[key]) {
        continue;
      }
      const value = row[key];
      if (typeof value === "number" && value > max) {
        max = value;
      }
    }
  }

  return max;
}

/** Nice tick steps multiplied by 10^n (avoids 135000 → 200000 jumps). */
const NICE_AXIS_FRACTIONS = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

/**
 * Round up to a readable axis top with modest headroom.
 * e.g. 15036 → 16000, 135000 → 150000
 */
export function getChartYAxisMax(dataMax) {
  if (dataMax <= 0) {
    return 10;
  }

  const target = dataMax * 1.05;
  const exponent = Math.floor(Math.log10(target));
  const scale = 10 ** exponent;
  const fraction = target / scale;

  for (const step of NICE_AXIS_FRACTIONS) {
    if (step >= fraction) {
      return step * scale;
    }
  }

  return 10 * scale;
}

/** Non-empty chart series from API (`chartdata` or `chartData`). */
export function getRecordChartData(record) {
  if (!record) {
    return null;
  }
  const data = record.chartdata ?? record.chartData;
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }
  return normalizeRecordChartData(data);
}

export function getRecordTitle(record, lang = "ka") {
  if (!record) {
    return "";
  }
  return lang === "en"
    ? (record.title_eng ?? record.title_geo ?? "")
    : (record.title_geo ?? record.title_eng ?? "");
}

/** Relative path from API (e.g. files/jandacva/10_….xlsx) → public URL. */
export function getRecordFilePath(record, lang = "ka") {
  if (!record) {
    return null;
  }
  const path =
    lang === "en"
      ? (record.path_eng ?? record.path_geo ?? null)
      : (record.path_geo ?? record.path_eng ?? null);
  if (!path || typeof path !== "string") {
    return null;
  }
  const trimmed = path.trim().replace(/^\/+/, "");
  if (!trimmed) {
    return null;
  }
  return `/${trimmed.split("/").map(encodeURIComponent).join("/")}`;
}

export function getRecordFileName(record, lang = "ka") {
  const url = getRecordFilePath(record, lang);
  if (!url) {
    return null;
  }
  const segment = url.split("/").pop();
  return segment ? decodeURIComponent(segment) : null;
}

/** Trigger browser download for a record file under /public. */
export function downloadRecordFile(record, lang = "ka") {
  const url = getRecordFilePath(record, lang);
  if (!url) {
    return;
  }
  const link = document.createElement("a");
  link.href = url;
  link.download = getRecordFileName(record, lang) ?? "download";
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
