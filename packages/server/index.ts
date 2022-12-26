import { createServer as createViteServer } from 'vite'
import express, { Request, Response } from 'express'
import type { ViteDevServer } from 'vite'
import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
// @ts-ignore
import sequelize from '../db'

dotenv.config()

const port = Number(process.env.SERVER_PORT) || 3001

async function createServer(isDev = process.env.NODE_ENV === 'development') {
  try {
    await sequelize.authenticate()
    console.log('Соединение с базой данных установлено')
  } catch (e) {
    console.error('Невозможно установить соединение с базой данных:', e)
  }

  const index = isDev
    ? fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8')
    : fs.readFileSync(
        path.resolve(__dirname, '../../client/dist/client/index.html'),
        'utf-8'
      )

  const app = express()

  let vite: ViteDevServer

  if (isDev) {
    vite = await createViteServer({
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

      let template = index
      let render

      if (isDev) {
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('../client/src/entry-server.tsx'))
          .render
      } else {
        // @ts-ignore
        render = (await import('../../client/dist/ssr/entry-server.cjs')).render
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
