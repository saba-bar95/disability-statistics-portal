import { Navigate, useParams } from "react-router-dom";
import SectorPageLayout from "../layouts/SectorPageLayout";
import { getSectorFromPathSegment } from "../constants/sectorRoutes";

export default function SectorPage() {
  const { language = "ka", sectorPath } = useParams();
  const sector = getSectorFromPathSegment(sectorPath);

  if (!sector) {
    return <Navigate to={`/${language}`} replace />;
  }

  return <SectorPageLayout sector={sector} />;
}
