function normalizeLetterKey(letter, lang) {
  const value = String(letter).trim();
  return lang === "en" ? value.toLowerCase() : value;
}

function displayLetter(key, lang) {
  return lang === "en" ? key.toUpperCase() : key;
}

/** Unique letters in API order; hasGlossary when at least one entry has ID and non-empty text. */
export function parseGlossaryLetters(entries, lang = "ka") {
  if (!Array.isArray(entries)) {
    return [];
  }

  const order = [];
  const seen = new Set();
  const hasGlossary = new Map();

  for (const entry of entries) {
    const raw = entry?.letter;
    if (raw == null || String(raw).trim() === "") {
      continue;
    }

    const key = normalizeLetterKey(raw, lang);
    if (!seen.has(key)) {
      seen.add(key);
      order.push(key);
      hasGlossary.set(key, false);
    }

    if (entry.ID != null && String(entry.text ?? "").trim() !== "") {
      hasGlossary.set(key, true);
    }
  }

  return order.map((key) => ({
    letter: displayLetter(key, lang),
    apiKey: key,
    hasGlossary: hasGlossary.get(key) ?? false,
  }));
}
