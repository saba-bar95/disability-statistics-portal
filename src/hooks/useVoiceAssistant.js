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
const VOICE_LANG_MAP = {
  ka: "ka-GE",
  en: "en-US",
};
const CLOUD_TTS_LANG_MAP = {
  ka: null,
  en: "en",
};
const GOOGLE_TTS_MAX_CHARS = 180;
const HOVER_SPEAK_DELAY_MS = 350;
const PLAYBACK_TIMEOUT_MS = 7000;
const GEORGIAN_CHARS = /[\u10A0-\u10FF]/;
const GEORGIAN_TO_LATIN_MAP = {
  ა: "a",
  ბ: "b",
  გ: "g",
  დ: "d",
  ე: "e",
  ვ: "v",
  ზ: "z",
  თ: "t",
  ი: "i",
  კ: "k",
  ლ: "l",
  მ: "m",
  ნ: "n",
  ო: "o",
  პ: "p",
  ჟ: "zh",
  რ: "r",
  ს: "s",
  ტ: "t",
  უ: "u",
  ფ: "p",
  ქ: "k",
  ღ: "gh",
  ყ: "q",
  შ: "sh",
  ჩ: "ch",
  ც: "ts",
  ძ: "dz",
  წ: "ts",
  ჭ: "ch",
  ხ: "kh",
  ჯ: "j",
  ჰ: "h",
};

function asElement(target) {
  if (!target) {
    return null;
  }

  if (target.nodeType === 3) {
    return target.parentElement || null;
  }

  return target instanceof Element ? target : null;
}

function splitTextForTts(text, chunkSize = GOOGLE_TTS_MAX_CHARS) {
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

function buildGoogleTtsUrl(text, langCode) {
  const params = new URLSearchParams({
    ie: "UTF-8",
    client: "tw-ob",
    tl: langCode,
    q: text,
  });

  return `https://translate.googleapis.com/translate_tts?${params.toString()}`;
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

function transliterateGeorgianToLatin(text) {
  return text
    .split("")
    .map((char) => GEORGIAN_TO_LATIN_MAP[char] || char)
    .join("");
}

export default function useVoiceAssistant(lang) {
  const [isEnabled, setIsEnabled] = useState(false);
  const lastSpokenRef = useRef("");
  const lastSpokenAtRef = useRef(0);
  const availableVoicesRef = useRef([]);
  const audioRef = useRef(null);
  const playbackTokenRef = useRef(0);
  const hoverTimeoutRef = useRef(null);

  const getLanguageConfig = useCallback(() => {
    const normalizedLang = lang === "ka" || lang === "en" ? lang : "en";
    return {
      uiLang: normalizedLang,
      speechLang: VOICE_LANG_MAP[normalizedLang],
      remoteLang: CLOUD_TTS_LANG_MAP[normalizedLang],
    };
  }, [lang]);

  const getPreferredVoice = useCallback(() => {
    const { speechLang } = getLanguageConfig();
    const normalizedSpeechLang = speechLang.toLowerCase();
    const langPrefix = normalizedSpeechLang.split("-")[0];
    const voices = availableVoicesRef.current;

    return (
      voices.find(
        (voice) => voice.lang?.toLowerCase() === normalizedSpeechLang,
      ) ||
      voices.find((voice) =>
        voice.lang?.toLowerCase().startsWith(`${langPrefix}-`),
      ) ||
      null
    );
  }, [getLanguageConfig]);

  const getFallbackVoice = useCallback(() => {
    const voices = availableVoicesRef.current;
    return voices.find((voice) => voice.default) || voices[0] || null;
  }, []);

  const hasVoiceForSpeechLang = useCallback((speechLang) => {
    const normalized = speechLang.toLowerCase();
    const prefix = normalized.split("-")[0];
    return availableVoicesRef.current.some((voice) => {
      const voiceLang = voice.lang?.toLowerCase();
      return voiceLang === normalized || voiceLang?.startsWith(`${prefix}-`);
    });
  }, []);

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

  const speakWithBrowser = useCallback(
    (text, speechLang) => {
      if (!window.speechSynthesis) {
        return false;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      const preferredVoice = getPreferredVoice();
      const fallbackVoice = getFallbackVoice();
      const selectedVoice = preferredVoice || fallbackVoice;

      utterance.lang = selectedVoice?.lang || speechLang;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      return true;
    },
    [getFallbackVoice, getPreferredVoice],
  );

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

        const audioUrl = buildGoogleTtsUrl(chunkText, remoteLang);
        await playAudioUrl(audioUrl, token);
      }
      return true;
    },
    [playAudioUrl],
  );

  const speakWithFallbacks = useCallback(
    async (text, languageConfig, token) => {
      const isGeorgian = languageConfig.uiLang === "ka";
      try {
        if (isGeorgian) {
          const hasGeorgianVoice = hasVoiceForSpeechLang(
            languageConfig.speechLang,
          );
          if (import.meta.env.DEV) {
            console.info(
              `[voice-assistant] provider=browser ui=${languageConfig.uiLang} speech=${languageConfig.speechLang} voiceMatch=${hasGeorgianVoice}`,
            );
          }
          if (!hasGeorgianVoice && GEORGIAN_CHARS.test(text)) {
            const transliterated = transliterateGeorgianToLatin(text);
            if (import.meta.env.DEV) {
              console.info(
                `[voice-assistant] provider=browser-translit ui=${languageConfig.uiLang} speech=en-US`,
              );
            }
            const translitSpoke = speakWithBrowser(transliterated, "en-US");
            if (!translitSpoke) {
              throw new Error(
                "Browser transliteration fallback is unavailable.",
              );
            }
            return;
          }

          const spoke = speakWithBrowser(text, languageConfig.speechLang);
          if (!spoke) {
            throw new Error("Browser speech synthesis is unavailable.");
          }
          return;
        }

        if (import.meta.env.DEV) {
          // Helps debug which provider path was used.
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
            `[voice-assistant] provider=fallback-browser ui=${languageConfig.uiLang} speech=${languageConfig.speechLang}`,
          );
        }
        speakWithBrowser(text, languageConfig.speechLang);
      }
    },
    [hasVoiceForSpeechLang, speakWithBrowser, speakWithRemote],
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
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }

      Promise.resolve().then(() =>
        speakWithFallbacks(cleaned, languageConfig, token),
      );
    },
    [getLanguageConfig, isEnabled, speakWithFallbacks],
  );

  useEffect(() => {
    if (!window.speechSynthesis) {
      return undefined;
    }

    const loadVoices = () => {
      availableVoicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

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
