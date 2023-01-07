import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'

dotenv.config()

// sequelize()

const port = Number(process.env.SERVER_PORT) || 3001

async function createServer(isDev = process.env.NODE_ENV === 'development') {
  const app = express()

  let vite: ViteDevServer

  if (isDev) {
    vite = await createViteServer({
      root: path.resolve(__dirname, '../client'),
      configFile: path.resolve(__dirname, '../client/vite.config.js'),
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
      },
      appType: 'custom',
    })

    app.use(vite.middlewares)
    app.use(cors())
  } else {
    app.use(
      express.static(path.resolve(__dirname, '../../client/dist/client'), {
        index: false,
      })
    )
  }

  app.use('*', async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl

      const index = isDev
        ? fs.readFileSync(
          path.resolve(__dirname, '../client/index.html'),
          'utf-8'
        )
        : fs.readFileSync(
          path.resolve(__dirname, '../../client/dist/client/index.html'),
          'utf-8'
        )

      let template = index
      let render

      if (isDev) {
        // Здесь сборка проекта не происходит
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('../client/src/entry-server.tsx'))
          .render
      } else {
        const ssrEntryPoint = require.resolve(
          '../../client/dist/ssr/entry-server.cjs'
        )
        render = (await import(ssrEntryPoint)).render
      }

      const appHtml = render(url)

      const html = template.replace(`<!--ssr-->`, appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      isDev && vite.ssrFixStacktrace(e as Error)
    }
  })

  return { app }
}

createServer().then(({ app }) => app.listen(port))
