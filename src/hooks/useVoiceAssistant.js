import { useContext } from "react";
import {
  VoiceAssistantContext,
  defaultVoiceAssistantValue,
} from "../context/voiceAssistantContext";

export function useVoiceAssistant() {
  const value = useContext(VoiceAssistantContext);
  if (value === defaultVoiceAssistantValue) {
    console.warn(
      "useVoiceAssistant: render inside VoiceAssistantProvider for a working voice assistant.",
    );
  }
  return value;
}

export function useVoiceAssistantOptional() {
  return useContext(VoiceAssistantContext);
}
