import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import GlossaryPage from "../pages/GlossaryPage";
import HomePage from "../pages/HomePage";
import InfographicPage from "../pages/InfographicPage";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ka" replace />,
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
