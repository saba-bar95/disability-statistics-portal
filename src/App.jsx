import { Analytics } from '@vercel/analytics/react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/AppRoutes'

function App() {
  const element = useRoutes(routes)

  return (
    <>
      {element}
      <Analytics />
    </>
  )
}

export default App
