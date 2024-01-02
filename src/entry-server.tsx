import {
  createStaticHandler,
  createStaticRouter,
  StaticHandlerContext,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { Request as ExpressRequest, Response as ExpressResponse } from 'express'
import { renderToPipeableStream } from 'react-dom/server'

import { App } from '~/app'
import { routes } from '~/processes'

import { Html } from './Html'

type Props = {
  request: ExpressRequest
  response: ExpressResponse
  bootstrap: string
}

export async function render({ request, response, bootstrap }: Props) {
  const context = await getStaticHandlerContext(request)
  const router = createStaticRouter(routes, context)

  const { pipe } = renderToPipeableStream(
    <Html>
      <App>
        <StaticRouterProvider router={router} context={context} />
      </App>
    </Html>,
    {
      onShellReady() {
        response.statusCode = 200
        response.setHeader('content-type', 'text/html')
        pipe(response)
      },
      bootstrapModules: [bootstrap],
    },
  )
}

async function getStaticHandlerContext(request: ExpressRequest) {
  const handler = createStaticHandler(routes)

  // Create FetchRequest
  const origin = `${request?.protocol}://${request.get('host')}`
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const url = new URL(request.originalUrl || request.url, origin)

  const controller = new AbortController()
  request.on('close', () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(request.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    signal: controller.signal,
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body
  }

  const fetchRequest = new Request(url.href, init)

  // Get Context
  const context = await handler.query(fetchRequest)

  return context as StaticHandlerContext
}
