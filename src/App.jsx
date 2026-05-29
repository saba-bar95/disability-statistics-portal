import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { useRoutes } from "react-router-dom";
import routes from "./routes/AppRoutes";
import RouteFallback from "./components/RouteFallback";
import ScrollToTop from "./components/ScrollToTop";
import VoiceAssistantProvider from "./context/VoiceAssistantProvider";
import usePortalDocumentTitle from "./hooks/usePortalDocumentTitle";

function App() {
  usePortalDocumentTitle();
  const element = useRoutes(routes);

  return (
    <VoiceAssistantProvider>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>{element}</Suspense>
      {import.meta.env.PROD ? <Analytics debug={false} /> : null}
    </VoiceAssistantProvider>
  );
}

export default App;
