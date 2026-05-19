import { Navigate, useLocation, useParams } from "react-router-dom";
import SectorPageLayout from "../layouts/SectorPageLayout";
import { getSectorFromPathname } from "../constants/sectorRoutes";

export default function SectorPage() {
  const { language = "ka" } = useParams();
  const { pathname } = useLocation();
  const sector = getSectorFromPathname(pathname);

  if (!sector) {
    return <Navigate to={`/${language}`} replace />;
  }

  return <SectorPageLayout sector={sector} />;
}
