import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

/** Nearest block used for hover speech (no `li` — record rows wrap charts and read all child text). */
const SPEAKABLE_SELECTOR = "h1,h2,h3,p,a,button,[data-tts]";
const VOICE_EXCLUDE_SELECTOR =
  '[data-no-tts], [data-sector-chart], .recharts-wrapper, .recharts-surface, .recharts-legend-wrapper, .recharts-default-legend, [class*="recharts-"]';
const TTS_API_URL = "https://tts-api.geostat.ge/request";
const TTS_API_LANG_MAP = {
  ka: "ka",
  en: "en",
};
const TTS_MAX_CHARS = 220;
const HOVER_SPEAK_DELAY_MS = 350;
const PLAYBACK_TIMEOUT_MS = 7000;
const VOICE_STORAGE_KEY = "ui-voice-assistant-enabled";
const WARMUP_TEXT_BY_LANG = {
  ka: "ა",
  en: "a",
};

/** Always off on page load; user must click the volume button (saves preference when toggled). */
function getInitialEnabled() {
  return false;
}

function asElement(target) {
  if (!target) {
    return null;
  }

  if (target.nodeType === 3) {
    return target.parentElement || null;
  }

  if (target instanceof Element) {
    return target;
  }

  if (typeof SVGElement !== "undefined" && target instanceof SVGElement) {
    return target;
  }

  return null;
}

function splitTextForTts(text, chunkSize = TTS_MAX_CHARS) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return [];
  }

  const chunks = [];
  let currentChunk = "";
  const words = normalized.split(" ");

  for (const word of words) {
    if (!currentChunk) {
      currentChunk = word;
      continue;
    }

    const candidate = `${currentChunk} ${word}`;
    if (candidate.length <= chunkSize) {
      currentChunk = candidate;
      continue;
    }

    chunks.push(currentChunk);
    currentChunk = word;
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

function supportsClosest(element) {
  const isDomNode =
    element instanceof Element ||
    (typeof SVGElement !== "undefined" && element instanceof SVGElement);

  return isDomNode && typeof element.closest === "function";
}

function safeClosest(element, selector) {
  if (!supportsClosest(element)) {
    return null;
  }

  try {
    return element.closest(selector);
  } catch {
    return null;
  }
}

function isVoiceAssistantExcluded(element) {
  if (!element) {
    return true;
  }

  if (!supportsClosest(element)) {
    return false;
  }

  return safeClosest(element, VOICE_EXCLUDE_SELECTOR) !== null;
}

function getReadableRoot(target) {
  const element = asElement(target);

  if (!element || isVoiceAssistantExcluded(element)) {
    return null;
  }

  const root = safeClosest(element, SPEAKABLE_SELECTOR);
  if (!root || isVoiceAssistantExcluded(root)) {
    return null;
  }

  return root;
}

function extractReadableText(target) {
  const element = getReadableRoot(target);
  if (!element) {
    return "";
  }

  const explicitText = element.getAttribute?.("data-tts");
  if (explicitText) {
    return explicitText.trim();
  }

  return (element.textContent || "").replace(/\s+/g, " ").trim();
}

function buildTtsUrl(text, remoteLang) {
  const params = new URLSearchParams({
    text,
    lang: remoteLang,
  });
  return `${TTS_API_URL}?${params.toString()}`;
}

function speakWithBrowserTts(text, uiLang) {
  if (!window.speechSynthesis) {
    return false;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = uiLang === "ka" ? "ka-GE" : "en-US";
  window.speechSynthesis.speak(utterance);
  return true;
}

export default function useVoiceAssistantState(lang) {
  const [isEnabled, setIsEnabledState] = useState(getInitialEnabled);
  const isEnabledRef = useRef(isEnabled);
  const audioUnlockedRef = useRef(false);
  const lastSpokenRef = useRef("");
  const lastSpokenAtRef = useRef(0);
  const audioRef = useRef(null);
  const playbackTokenRef = useRef(0);
  const hoverTimeoutRef = useRef(null);
  const hoverRootRef = useRef(null);
  const hoverSpeakGenerationRef = useRef(0);

  const normalizedLang = lang === "ka" || lang === "en" ? lang : "en";
  const remoteLang = TTS_API_LANG_MAP[normalizedLang];

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  /** Stop audio/TTS without clearing hover timers (used when switching targets). */
  const abortActivePlayback = useCallback(() => {
    playbackTokenRef.current += 1;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const stopPlayback = useCallback(() => {
    abortActivePlayback();
    clearHoverTimeout();
    hoverRootRef.current = null;
    hoverSpeakGenerationRef.current += 1;
  }, [abortActivePlayback, clearHoverTimeout]);

  const playAudioUrl = useCallback((audioUrl, token) => {
    return new Promise((resolve, reject) => {
      if (token !== playbackTokenRef.current) {
        resolve();
        return;
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      let timeoutId = null;

      const cleanup = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        audio.onended = null;
        audio.onerror = null;
        if (audioRef.current === audio) {
          audioRef.current = null;
        }
      };

      audio.onended = () => {
        cleanup();
        audioUnlockedRef.current = true;
        resolve();
      };

      audio.onerror = () => {
        cleanup();
        reject(new Error("Cloud TTS audio playback failed."));
      };

      timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error("Cloud TTS audio playback timed out."));
      }, PLAYBACK_TIMEOUT_MS);

      audio.play().catch((error) => {
        cleanup();
        reject(error);
      });
    });
  }, []);

  const speakWithRemote = useCallback(
    async (text, token) => {
      const chunks = splitTextForTts(text);
      for (const chunkText of chunks) {
        if (token !== playbackTokenRef.current) {
          return;
        }
        await playAudioUrl(buildTtsUrl(chunkText, remoteLang), token);
      }
    },
    [playAudioUrl, remoteLang],
  );

  const speakText = useCallback(
    async (text) => {
      const cleaned = text?.trim();
      if (!cleaned || !isEnabledRef.current) {
        return;
      }

      const now = Date.now();
      if (
        cleaned === lastSpokenRef.current &&
        now - lastSpokenAtRef.current < 1000
      ) {
        return;
      }

      abortActivePlayback();
      const token = playbackTokenRef.current;

      lastSpokenRef.current = cleaned;
      lastSpokenAtRef.current = now;

      try {
        await speakWithRemote(cleaned, token);
      } catch {
        if (token !== playbackTokenRef.current) {
          return;
        }
        speakWithBrowserTts(cleaned, normalizedLang);
      }
    },
    [abortActivePlayback, normalizedLang, speakWithRemote],
  );

  const unlockAudioFromGesture = useCallback(async () => {
    const warmupText =
      WARMUP_TEXT_BY_LANG[remoteLang] ?? WARMUP_TEXT_BY_LANG.en;
    const audioUrl = buildTtsUrl(warmupText, remoteLang);

    try {
      await fetch(audioUrl, { mode: "cors", credentials: "omit" });
    } catch {
      // Continue — playback may still work.
    }

    const audio = new Audio(audioUrl);
    audio.volume = 0.01;

    try {
      await audio.play();
      audio.pause();
      audioUnlockedRef.current = true;
      return true;
    } catch {
      return false;
    }
  }, [remoteLang]);

  const setIsEnabled = useCallback((value) => {
    setIsEnabledState((previous) => {
      const next = typeof value === "function" ? value(previous) : value;
      isEnabledRef.current = next;
      try {
        window.localStorage.setItem(VOICE_STORAGE_KEY, next ? "true" : "false");
      } catch {
        // Storage may be unavailable in private mode or restricted embeds.
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      audioUnlockedRef.current = false;
      stopPlayback();
    }
  }, [isEnabled, stopPlayback]);

  const toggleEnabled = useCallback(async () => {
    if (isEnabledRef.current) {
      setIsEnabled(false);
      return;
    }

    isEnabledRef.current = true;
    flushSync(() => {
      setIsEnabledState(true);
      try {
        window.localStorage.setItem(VOICE_STORAGE_KEY, "true");
      } catch {
        // Storage may be unavailable.
      }
    });
    await unlockAudioFromGesture();
  }, [unlockAudioFromGesture]);

  useEffect(() => {
    isEnabledRef.current = isEnabled;
  }, [isEnabled]);

  useLayoutEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const scheduleSpeak = (target) => {
      const element = asElement(target);
      if (!element || isVoiceAssistantExcluded(element)) {
        return;
      }

      const root = getReadableRoot(target);
      const text = extractReadableText(target);
      if (!text || !root) {
        return;
      }

      if (hoverRootRef.current === root && hoverTimeoutRef.current) {
        return;
      }

      const isSwitchingElement =
        hoverRootRef.current && hoverRootRef.current !== root;

      clearHoverTimeout();

      if (isSwitchingElement) {
        hoverSpeakGenerationRef.current += 1;
        abortActivePlayback();
      }

      hoverRootRef.current = root;
      hoverSpeakGenerationRef.current += 1;
      const speakGeneration = hoverSpeakGenerationRef.current;

      hoverTimeoutRef.current = setTimeout(() => {
        hoverTimeoutRef.current = null;
        if (speakGeneration !== hoverSpeakGenerationRef.current) {
          return;
        }
        void speakText(text);
      }, HOVER_SPEAK_DELAY_MS);
    };

    const onMouseOver = (event) => {
      try {
        const target = event.target;
        const root = hoverRootRef.current;
        if (
          root instanceof Element &&
          target instanceof Node &&
          root.contains(target)
        ) {
          return;
        }
        scheduleSpeak(target);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("[voice-assistant] mouseover failed", error);
        }
      }
    };

    const onMouseOut = (event) => {
      try {
        const root = hoverRootRef.current;
        if (!(root instanceof Element)) {
          return;
        }
        const related = event.relatedTarget;
        if (related instanceof Node && root.contains(related)) {
          return;
        }

        hoverSpeakGenerationRef.current += 1;
        clearHoverTimeout();
        hoverRootRef.current = null;
        abortActivePlayback();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("[voice-assistant] mouseout failed", error);
        }
      }
    };

    const onClick = (event) => {
      try {
        const text = extractReadableText(event.target);
        if (!text) {
          return;
        }
        clearHoverTimeout();
        hoverSpeakGenerationRef.current += 1;
        hoverRootRef.current = null;
        void speakText(text);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("[voice-assistant] click failed", error);
        }
      }
    };

    document.addEventListener("mouseover", onMouseOver, true);
    document.addEventListener("mouseout", onMouseOut, true);
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("mouseover", onMouseOver, true);
      document.removeEventListener("mouseout", onMouseOut, true);
      document.removeEventListener("click", onClick, true);
      clearHoverTimeout();
      hoverRootRef.current = null;
    };
  }, [
    abortActivePlayback,
    clearHoverTimeout,
    isEnabled,
    speakText,
    stopPlayback,
  ]);

  return {
    isEnabled,
    setIsEnabled,
    toggleEnabled,
    stop: stopPlayback,
    speak: speakText,
  };
}
