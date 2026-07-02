import { createBrowserRouter } from 'react-router-dom'
import Catalog from '@/pages/Catalog'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Catalog />,
  },
  {
    path: '*',
    element: <Catalog />,
  },
])
