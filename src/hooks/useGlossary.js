import { useCallback, useEffect, useState } from "react";
import { fetchGlossaryByLang, fetchGlossaryByLetter } from "../services/glossaryApi";
import { getGlossaryEntries } from "../utils/glossaryEntries";
import { parseGlossaryLetters } from "../utils/glossaryLetters";

export default function useGlossary(language = "ka") {
  const [snapshot, setSnapshot] = useState({
    language: null,
    letters: [],
    allEntries: [],
    error: null,
  });
  const [letterFilter, setLetterFilter] = useState({ language: null, key: null });
  const [letterSnapshot, setLetterSnapshot] = useState({
    language: null,
    key: null,
    entries: [],
    error: null,
  });

  const selectedLetterKey =
    letterFilter.language === language ? letterFilter.key : null;

  useEffect(() => {
    let isMounted = true;

    fetchGlossaryByLang(language)
      .then((data) => {
        if (!isMounted) {
          return;
        }
        setSnapshot({
          language,
          letters: parseGlossaryLetters(data, language),
          allEntries: getGlossaryEntries(data),
          error: null,
        });
        setLetterFilter({ language, key: null });
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        if (import.meta.env.DEV) {
          console.error("[glossaryApi] fetch failed:", err);
        }
        setSnapshot({
          language,
          letters: [],
          allEntries: [],
          error: err,
        });
        setLetterFilter({ language, key: null });
      });

    return () => {
      isMounted = false;
    };
  }, [language]);

  useEffect(() => {
    if (!selectedLetterKey) {
      return;
    }

    let isMounted = true;

    fetchGlossaryByLetter(language, selectedLetterKey)
      .then((data) => {
        if (!isMounted) {
          return;
        }
        setLetterSnapshot({
          language,
          key: selectedLetterKey,
          entries: getGlossaryEntries(data),
          error: null,
        });
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        if (import.meta.env.DEV) {
          console.error("[glossaryApi] letter fetch failed:", err);
        }
        setLetterSnapshot({
          language,
          key: selectedLetterKey,
          entries: [],
          error: err,
        });
      });

    return () => {
      isMounted = false;
    };
  }, [language, selectedLetterKey]);

  const selectLetter = useCallback(
    (apiKey) => {
      if (!apiKey) {
        return;
      }
      setLetterFilter((current) => {
        if (current.language === language && current.key === apiKey) {
          return { language, key: null };
        }
        return { language, key: apiKey };
      });
    },
    [language],
  );

  const clearLetterFilter = useCallback(() => {
    setLetterFilter({ language, key: null });
  }, [language]);

  const isCurrent = snapshot.language === language;
  const isLettersLoading = !isCurrent;
  const letters = isCurrent ? snapshot.letters : [];
  const lettersError = isCurrent ? snapshot.error : null;

  const isLetterSnapshotCurrent =
    selectedLetterKey != null &&
    letterSnapshot.language === language &&
    letterSnapshot.key === selectedLetterKey;

  const entries = selectedLetterKey
    ? isLetterSnapshotCurrent
      ? letterSnapshot.entries
      : []
    : isCurrent
      ? snapshot.allEntries
      : [];

  const isEntriesLoading =
    isLettersLoading ||
    (selectedLetterKey != null && !isLetterSnapshotCurrent);

  const entriesError = selectedLetterKey
    ? isLetterSnapshotCurrent
      ? letterSnapshot.error
      : null
    : lettersError;

  return {
    letters,
    entries,
    isLettersLoading,
    isEntriesLoading,
    lettersError,
    entriesError,
    selectedLetterKey,
    selectLetter,
    clearLetterFilter,
  };
}
