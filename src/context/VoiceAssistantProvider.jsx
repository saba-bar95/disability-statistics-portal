import { useLocation } from "react-router-dom";
import useVoiceAssistantState from "../hooks/useVoiceAssistantState";
import { VoiceAssistantContext } from "./voiceAssistantContext";

function getLangFromPathname(pathname) {
  const match = pathname.match(/^\/(ka|en)(?:\/|$)/);
  return match?.[1] ?? "ka";
}

export default function VoiceAssistantProvider({ children }) {
  const { pathname } = useLocation();
  const lang = getLangFromPathname(pathname);
  const value = useVoiceAssistantState(lang);

  return (
    <VoiceAssistantContext.Provider value={value}>
      {children}
    </VoiceAssistantContext.Provider>
  );
}
