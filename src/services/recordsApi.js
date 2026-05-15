const FALLBACK_API_BASE_URL = "https://disability-api.geostat.ge/api";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || FALLBACK_API_BASE_URL;

export async function fetchRecords(lang = "ka") {
  const params = new URLSearchParams({ lang });
  const url = `${API_BASE_URL}/records?${params.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch records: ${response.status}`);
  }

  return response.json();
}

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

export function getRecordTitle(record, lang = "ka") {
  if (!record) {
    return "";
  }
  return lang === "en"
    ? (record.title_eng ?? record.title_geo ?? "")
    : (record.title_geo ?? record.title_eng ?? "");
}
