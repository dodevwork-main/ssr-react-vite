import { hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { App } from '~/app'
import { routes } from '~/processes'

const router = createBrowserRouter(routes)

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <App>
    <RouterProvider router={router} />
  </App>,
)
