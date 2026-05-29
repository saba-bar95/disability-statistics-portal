import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

const INTERACTIVE_TAGS = new Set([
  "BUTTON",
  "A",
  "H1",
  "H2",
  "H3",
  "P",
  "LI",
  "SPAN",
]);
const TTS_API_URL = "https://tts-api.geostat.ge/request";
const TTS_API_LANG_MAP = {
  ka: "ka",
  en: "en",
};
const TTS_MAX_CHARS = 220;
const HOVER_SPEAK_DELAY_MS = 350;
const UNHOVER_STOP_DELAY_MS = 1000;
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

  return target instanceof Element ? target : null;
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

function getReadableRoot(target) {
  const element = asElement(target);

  if (!element || element.closest('[data-no-tts="true"]')) {
    return null;
  }

  if (element.getAttribute?.("data-tts")) {
    return element;
  }

  if (!INTERACTIVE_TAGS.has(element.tagName)) {
    return null;
  }

  return element;
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
  const unhoverStopTimeoutRef = useRef(null);
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

  const clearUnhoverStopTimeout = useCallback(() => {
    if (unhoverStopTimeoutRef.current) {
      clearTimeout(unhoverStopTimeoutRef.current);
      unhoverStopTimeoutRef.current = null;
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
    clearUnhoverStopTimeout();
    hoverRootRef.current = null;
  }, [abortActivePlayback, clearHoverTimeout, clearUnhoverStopTimeout]);

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

  const setIsEnabled = useCallback(
    (value) => {
      setIsEnabledState((previous) => {
        const next = typeof value === "function" ? value(previous) : value;
        isEnabledRef.current = next;
        window.localStorage.setItem(VOICE_STORAGE_KEY, next ? "true" : "false");
        if (!next) {
          audioUnlockedRef.current = false;
          stopPlayback();
        }
        return next;
      });
    },
    [stopPlayback],
  );

  const toggleEnabled = useCallback(async () => {
    if (isEnabledRef.current) {
      setIsEnabled(false);
      return;
    }

    isEnabledRef.current = true;
    flushSync(() => {
      setIsEnabled(true);
    });
    await unlockAudioFromGesture();
  }, [setIsEnabled, unlockAudioFromGesture]);

  useEffect(() => {
    isEnabledRef.current = isEnabled;
  }, [isEnabled]);

  useLayoutEffect(() => {
    if (!isEnabled) {
      return undefined;
    }

    const scheduleSpeak = (target) => {
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

      clearUnhoverStopTimeout();
      clearHoverTimeout();

      if (isSwitchingElement) {
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
      clearUnhoverStopTimeout();
      const target = event.target;
      if (
        hoverRootRef.current &&
        target instanceof Node &&
        hoverRootRef.current.contains(target)
      ) {
        return;
      }
      scheduleSpeak(target);
    };

    const onMouseOut = (event) => {
      const root = hoverRootRef.current;
      if (!root) {
        return;
      }
      const related = event.relatedTarget;
      if (related instanceof Node && root.contains(related)) {
        return;
      }
      if (!audioRef.current && !window.speechSynthesis?.speaking) {
        clearUnhoverStopTimeout();
        clearHoverTimeout();
        hoverRootRef.current = null;
        return;
      }

      clearUnhoverStopTimeout();
      clearHoverTimeout();
      unhoverStopTimeoutRef.current = setTimeout(() => {
        unhoverStopTimeoutRef.current = null;
        hoverRootRef.current = null;
        stopPlayback();
      }, UNHOVER_STOP_DELAY_MS);
    };

    const onClick = (event) => {
      const text = extractReadableText(event.target);
      if (!text) {
        return;
      }
      clearUnhoverStopTimeout();
      clearHoverTimeout();
      hoverSpeakGenerationRef.current += 1;
      hoverRootRef.current = null;
      void speakText(text);
    };

    document.addEventListener("mouseover", onMouseOver, true);
    document.addEventListener("mouseout", onMouseOut, true);
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("mouseover", onMouseOver, true);
      document.removeEventListener("mouseout", onMouseOut, true);
      document.removeEventListener("click", onClick, true);
      clearHoverTimeout();
      clearUnhoverStopTimeout();
      hoverRootRef.current = null;
    };
  }, [
    abortActivePlayback,
    clearHoverTimeout,
    clearUnhoverStopTimeout,
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
