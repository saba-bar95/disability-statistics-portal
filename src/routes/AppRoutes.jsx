import { Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AboutPage from '../pages/AboutPage'
import HomePage from '../pages/HomePage'
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
    ],
  },
  {
    path: '*',
    element: <Navigate to="/ka" replace />,
  },
]

export default routes
