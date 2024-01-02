import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

import { Path } from '~/shared/config/constants'

/* eslint-disable react-refresh/only-export-components */
const HomePage = lazy(() => import('../pages/home'))
const EnvExamplePage = lazy(() => import('../pages/env-example'))
const NewsPage = lazy(() => import('../pages/news'))

export const routes: RouteObject[] = [
  {
    path: Path.Home,
    element: <HomePage />,
  },
  {
    path: Path.EnvExample,
    element: <EnvExamplePage />,
  },
  {
    path: Path.News,
    element: <NewsPage />,
  },
]

/* eslint-enable react-refresh/only-export-components */
