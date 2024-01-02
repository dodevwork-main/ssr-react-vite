import express from 'express'

import { NODE_ENV, SERVER_PORT } from './env'
import { configDevelopment, configProduction } from './config'

const isProd = NODE_ENV === 'production'

export async function createServer() {
  const app = express()

  if (isProd) {
    await configProduction(app)
  } else {
    await configDevelopment(app)
  }

  app.listen(SERVER_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`http://localhost:${SERVER_PORT}`)
  })
}

createServer()
