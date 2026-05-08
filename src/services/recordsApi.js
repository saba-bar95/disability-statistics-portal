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
