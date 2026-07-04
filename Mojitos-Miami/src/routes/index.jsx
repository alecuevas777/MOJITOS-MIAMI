import { createBrowserRouter } from 'react-router-dom'
import Catalog from '@/pages/Catalog'
import Admin from '@/pages/Admin'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Catalog />,
  },
  {
    path: '*',
    element: <Catalog />,
  },
  {
    path: '/admin',
    element: <Admin />,
  }
])
