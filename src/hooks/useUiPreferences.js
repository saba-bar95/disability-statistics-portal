import { useCallback, useEffect, useMemo, useState } from "react";

const FONT_STEPS = [100, 110];
const FONT_STORAGE_KEY = "ui-font-scale";
const THEME_STORAGE_KEY = "ui-theme";

function getInitialFontScale() {
  const stored = Number(window.localStorage.getItem(FONT_STORAGE_KEY));
  return FONT_STEPS.includes(stored) ? stored : 100;
}

function getInitialTheme() {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "dark" ? "dark" : "light";
}

export default function useUiPreferences() {
  const [fontScale, setFontScale] = useState(getInitialFontScale);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontScale}%`;
    window.localStorage.setItem(FONT_STORAGE_KEY, String(fontScale));
  }, [fontScale]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const increaseFontSize = useCallback(() => {
    setFontScale((current) => {
      const currentIdx = FONT_STEPS.indexOf(current);
      const nextIdx = currentIdx === FONT_STEPS.length - 1 ? 0 : currentIdx + 1;
      return FONT_STEPS[nextIdx];
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return useMemo(
    () => ({ fontScale, increaseFontSize, theme, toggleTheme }),
    [fontScale, increaseFontSize, theme, toggleTheme],
  );
}
