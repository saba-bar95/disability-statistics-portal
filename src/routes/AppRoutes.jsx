import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import GlossaryPage from "../pages/GlossaryPage";
import HomePage from "../pages/HomePage";
import InfographicPage from "../pages/InfographicPage";
import SectorPage from "../pages/SectorPage";
import { SECTOR_ROUTES } from "../constants/sectorRoutes";

const sectorRoutes = SECTOR_ROUTES.map(({ path }) => ({
  path: `/:language/${path}`,
  element: <SectorPage />,
}));

const routes = [
  {
    path: "/",
    element: <Navigate to="/ka" replace />,
  },
  ...sectorRoutes,
  {
    path: "/:language",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "glossary",
        element: <GlossaryPage />,
      },
      {
        path: "infographic",
        element: <InfographicPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/ka" replace />,
  },
];

export default routes;
