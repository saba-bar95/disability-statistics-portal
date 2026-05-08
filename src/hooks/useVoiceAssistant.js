import { useCallback, useEffect, useRef, useState } from "react";

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
const PLAYBACK_TIMEOUT_MS = 7000;

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

function extractReadableText(target) {
  const element = asElement(target);

  if (!element || element.closest('[data-no-tts="true"]')) {
    return "";
  }

  const explicitText = element.getAttribute?.("data-tts");
  if (explicitText) {
    return explicitText.trim();
  }

  if (!INTERACTIVE_TAGS.has(element.tagName)) {
    return "";
  }

  return (element.textContent || "").replace(/\s+/g, " ").trim();
}

export default function useVoiceAssistant(lang) {
  const [isEnabled, setIsEnabled] = useState(false);
  const lastSpokenRef = useRef("");
  const lastSpokenAtRef = useRef(0);
  const audioRef = useRef(null);
  const playbackTokenRef = useRef(0);
  const hoverTimeoutRef = useRef(null);

  const getLanguageConfig = useCallback(() => {
    const normalizedLang = lang === "ka" || lang === "en" ? lang : "en";
    return {
      uiLang: normalizedLang,
      remoteLang: TTS_API_LANG_MAP[normalizedLang],
    };
  }, [lang]);

  const stop = useCallback(() => {
    playbackTokenRef.current += 1;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const playAudioUrl = useCallback(
    (audioUrl, token, timeoutMs = PLAYBACK_TIMEOUT_MS) => {
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
          resolve();
        };

        audio.onerror = () => {
          cleanup();
          reject(new Error("Cloud TTS audio playback failed."));
        };

        timeoutId = setTimeout(() => {
          cleanup();
          reject(new Error("Cloud TTS audio playback timed out."));
        }, timeoutMs);

        audio
          .play()
          .then(() => {})
          .catch((error) => {
            cleanup();
            reject(error);
          });
      });
    },
    [],
  );

  const speakWithRemote = useCallback(
    async (text, remoteLang, token) => {
      if (!remoteLang) {
        throw new Error("Remote TTS is not configured for this language.");
      }
      const chunks = splitTextForTts(text);
      for (const chunkText of chunks) {
        if (token !== playbackTokenRef.current) {
          return false;
        }

        const params = new URLSearchParams({
          text: chunkText,
          lang: remoteLang,
        });
        const audioUrl = `${TTS_API_URL}?${params.toString()}`;
        await playAudioUrl(audioUrl, token);
      }
      return true;
    },
    [playAudioUrl],
  );

  const speakWithFallbacks = useCallback(
    async (text, languageConfig, token) => {
      try {
        if (import.meta.env.DEV) {
          console.info(
            `[voice-assistant] provider=remote ui=${languageConfig.uiLang} remote=${languageConfig.remoteLang}`,
          );
        }
        await speakWithRemote(text, languageConfig.remoteLang, token);
      } catch {
        if (token !== playbackTokenRef.current) {
          return;
        }
        if (import.meta.env.DEV) {
          console.info(
            `[voice-assistant] provider=remote-failed ui=${languageConfig.uiLang} remote=${languageConfig.remoteLang}`,
          );
        }
      }
    },
    [speakWithRemote],
  );

  const speak = useCallback(
    (text) => {
      const cleaned = text?.trim();
      if (!cleaned || !isEnabled) {
        return;
      }

      const now = Date.now();
      if (
        cleaned === lastSpokenRef.current &&
        now - lastSpokenAtRef.current < 1000
      ) {
        return;
      }

      lastSpokenRef.current = cleaned;
      lastSpokenAtRef.current = now;
      const languageConfig = getLanguageConfig();

      const token = playbackTokenRef.current + 1;
      playbackTokenRef.current = token;

      Promise.resolve().then(() =>
        speakWithFallbacks(cleaned, languageConfig, token),
      );
    },
    [getLanguageConfig, isEnabled, speakWithFallbacks],
  );

  useEffect(() => {
    const onHover = (event) => {
      const text = extractReadableText(event.target);
      if (text) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        hoverTimeoutRef.current = setTimeout(() => {
          speak(text);
        }, HOVER_SPEAK_DELAY_MS);
      }
    };

    const onClick = (event) => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      const text = extractReadableText(event.target);
      if (text) {
        speak(text);
      }
    };

    document.addEventListener("mouseover", onHover, true);
    document.addEventListener("click", onClick, true);

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      document.removeEventListener("mouseover", onHover, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [speak]);

  useEffect(() => () => stop(), [stop]);

  return { isEnabled, setIsEnabled, stop, speak };
}
