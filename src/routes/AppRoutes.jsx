import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  GlossaryPage,
  HomePage,
  InfographicPage,
  SectorPage,
} from "./lazyPages";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ka" replace />,
  },
  {
    path: "/:language/:sectorPath",
    element: <SectorPage />,
  },
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
