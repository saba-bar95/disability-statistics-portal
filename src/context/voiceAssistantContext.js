import { createContext } from "react";

/** Safe fallback when a consumer renders outside VoiceAssistantProvider. */
export const defaultVoiceAssistantValue = {
  isEnabled: false,
  setIsEnabled: () => {},
  toggleEnabled: async () => {},
  stop: () => {},
  speak: async () => {},
};

export const VoiceAssistantContext = createContext(defaultVoiceAssistantValue);
