import './index.scss'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { AuthGuard } from './features/authGuard'
import { NextUIProvider } from '@nextui-org/react'
import { Layout } from './app/components/layout/layout'
import { ComponentProvider } from './context-provider'
import { Auth } from './pages/auth'
import { Registration } from './pages/registration'

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <Provider store={store}>
      <NextUIProvider>
        <ComponentProvider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </ComponentProvider>
      </NextUIProvider>
    </Provider>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
