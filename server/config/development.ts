import { Express } from 'express'

const PATH_ENTRY_SERVER = './src/entry-server.tsx'
const PATH_ENTRY_CLIENT = '/src/entry-client.tsx'

export async function configDevelopment(app: Express) {
  const cwd = process.cwd()

  const vite = await (
    await import('vite')
  ).createServer({
    root: cwd,
    server: {
      middlewareMode: true,
      hmr: true,
    },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (request, response) => {
    try {
      const render = (await vite.ssrLoadModule(PATH_ENTRY_SERVER)).render

      await render({ request, response, bootstrap: PATH_ENTRY_CLIENT })
    } catch (e) {
      const error = e as Error

      // eslint-disable-next-line no-console
      console.error(error)
      vite.ssrFixStacktrace(error)
      response.status(500).end(error.stack)
    }
  })
}
