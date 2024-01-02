import fs from 'fs'

import { Express } from 'express'
import serveStatic from 'serve-static'

const PATH_CLIENT = './dist/client'
const PATH_CLIENT_ASSETS = './dist/client/assets'
const PATH_ENTRY_SERVER = './ssr/entry-server.js'

export async function configProduction(app: Express) {
  app.use(serveStatic(PATH_CLIENT, { index: false }))

  app.use('*', async (request, response) => {
    const render = (await import(PATH_ENTRY_SERVER)).render

    // replace bootstrap script with compiled scripts
    const bootstrap =
      '/assets/' +
      fs
        .readdirSync(PATH_CLIENT_ASSETS)
        .filter(
          (fn: string) => fn.includes('entry-client') && fn.endsWith('.js'),
        )[0]

    await render({ request, response, bootstrap })
  })
}
