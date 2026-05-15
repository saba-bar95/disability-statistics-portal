import { Navigate } from "react-router-dom";
import EducationPage from "../pages/EducationPage";
import MainLayout from "../layouts/MainLayout";
import GlossaryPage from "../pages/GlossaryPage";
import HealthcarePage from "../pages/HealthcarePage";
import HomePage from "../pages/HomePage";
import InfographicPage from "../pages/InfographicPage";
import SocialSecurityPage from "../pages/SocialSecurityPage";
import SportPage from "../pages/SportPage";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ka" replace />,
  },
  {
    path: "/:language/education",
    element: <EducationPage />,
  },
  {
    path: "/:language/healthcare",
    element: <HealthcarePage />,
  },
  {
    path: "/:language/sports",
    element: <SportPage />,
  },
  {
    path: "/:language/social-security",
    element: <SocialSecurityPage />,
  },
  {
    path: "/:language/glossary",
    element: <GlossaryPage />,
  },
  {
    path: "/:language/infographic",
    element: <InfographicPage />,
  },
  {
    path: "/:language",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/ka" replace />,
  },
];

export default routes;
