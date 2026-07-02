import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import { router } from '@/routes'

export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: { background: '#1a1a1a', color: '#fff', border: '1px solid #2a2a2a' },
        }}
      />
    </HelmetProvider>
  )
}
