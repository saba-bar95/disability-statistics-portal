const TERM_DEFINITION_SPLIT = /^(.+?)\s*[–−—-]\s*(.+)$/s;

function stripLeadingDash(value) {
  return String(value ?? "")
    .replace(/^[\s–−—-]+/, "")
    .trim();
}

/** Split API `text` into bold term + definition (supports HTML <b> or plain "term – text"). */
export function parseGlossaryEntryText(rawText) {
  const text = String(rawText ?? "").trim();
  if (!text) {
    return { term: "", definition: "" };
  }

  if (/<b>/i.test(text) && typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(text, "text/html");
    const bold = doc.querySelector("b");
    if (bold) {
      const term = bold.textContent?.trim() ?? "";
      let definition = (doc.body.textContent ?? "").trim();
      if (term && definition.startsWith(term)) {
        definition = definition.slice(term.length).trim();
      }
      definition = stripLeadingDash(definition);
      return { term, definition };
    }
  }

  const plain = text.replace(/<[^>]+>/g, "").trim();
  const match = plain.match(TERM_DEFINITION_SPLIT);
  if (match) {
    return {
      term: match[1].trim(),
      definition: match[2].trim(),
    };
  }

  return { term: "", definition: plain };
}

export function getGlossaryEntries(entries) {
  if (!Array.isArray(entries)) {
    return [];
  }

  return entries
    .filter(
      (entry) =>
        entry?.ID != null && String(entry.text ?? "").trim() !== "",
    )
    .map((entry) => {
      const { term, definition } = parseGlossaryEntryText(entry.text);
      return {
        id: entry.ID,
        letter: entry.letter,
        term,
        definition,
      };
    });
}
