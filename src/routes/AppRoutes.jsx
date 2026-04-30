import { Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AboutPage from '../pages/AboutPage'
import GlossaryPage from '../pages/GlossaryPage'
import HomePage from '../pages/HomePage'
import InfographicPage from '../pages/InfographicPage'
import ServicesPage from '../pages/ServicesPage'
import StatisticsPage from '../pages/StatisticsPage'

const routes = [
  {
    path: '/',
    element: <Navigate to="/ka" replace />,
  },
  {
    path: '/:language',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'statistics',
        element: <StatisticsPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'glossary',
        element: <GlossaryPage />,
      },
      {
        path: 'infographic',
        element: <InfographicPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/ka" replace />,
  },
]

export default routes
