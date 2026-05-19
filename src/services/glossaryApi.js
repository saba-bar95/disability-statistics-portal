import { API_BASE_URL } from "./recordsApi";

export async function fetchGlossaryByLang(lang = "ka") {
  const langKey = lang === "en" ? "en" : "ka";
  const url = `${API_BASE_URL}/glossary/lang/${langKey}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch glossary: ${response.status}`);
  }

  return response.json();
}

export async function fetchGlossaryByLetter(lang, letter) {
  const langKey = lang === "en" ? "en" : "ka";
  const encoded = encodeURIComponent(String(letter).trim());
  const url = `${API_BASE_URL}/glossary/lang/${langKey}/letter/${encoded}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch glossary for letter "${letter}": ${response.status}`,
    );
  }

  return response.json();
}
