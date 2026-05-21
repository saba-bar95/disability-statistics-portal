import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { isSectorPathname } from "../constants/sectorRoutes";

const SUPPORTED_LANGS = ["ka", "en"];

/** Path after the language segment, e.g. `/ka/education` → `/education`. */
function pathWithoutLanguage(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return "/";
  }
  if (SUPPORTED_LANGS.includes(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

function isLanguageOnlyChange(prevPathname, nextPathname) {
  return (
    prevPathname !== nextPathname &&
    pathWithoutLanguage(prevPathname) === pathWithoutLanguage(nextPathname)
  );
}

/**
 * Scrolls to top when the route pathname changes (e.g. glossary, infographic, sector).
 * Skips scroll when only the language prefix changes (`/ka/...` ↔ `/en/...`).
 * Same-path hash links (home sections) scroll to the target id instead.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const previousPath = prevPathname.current;
    const pathnameChanged = previousPath !== pathname;
    const languageOnly = isLanguageOnlyChange(previousPath, pathname);
    prevPathname.current = pathname;

    if (languageOnly) {
      return;
    }

    if (!pathnameChanged) {
      if (!hash) {
        return;
      }
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }

    if (hash) {
      const id = hash.replace(/^#/, "");
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
      return;
    }

    const sectorToSector =
      pathnameChanged &&
      isSectorPathname(previousPath) &&
      isSectorPathname(pathname);

    if (sectorToSector) {
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}
