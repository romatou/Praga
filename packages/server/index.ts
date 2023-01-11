import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

import { topicsRouter } from './controllers'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import sequelize from './sequelize'
import router from './router'

dotenv.config()

sequelize()

const port = Number(process.env.SERVER_PORT) || 3001

async function createServer(isDev = process.env.NODE_ENV === 'development') {

  const app = express()

  app.disable('x-powered-by').enable('trust proxy')

  const index = isDev
    ? fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8')
    : fs.readFileSync(
        path.resolve(__dirname, '../../client/dist/client/index.html'),
        'utf-8'
      )

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
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/topics', topicsRouter)

  /*app.get('/', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })*/

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(router)
  app.use('*', async (req: Request, res: Response) => {
    try {
      const url = req.originalUrl
      let template = index
      let render
      let store

      if (isDev) {
        template = await vite.transformIndexHtml(url, template)

        render = (await vite.ssrLoadModule('../client/src/entry-server.tsx'))
          .render

        store = (await vite.ssrLoadModule('../client/src/entry-server.tsx'))
          .store
      } else {
        const ssrEntryPoint = require.resolve(
          '../../client/dist/ssr/entry-server.cjs'
        )
        render = (await import(ssrEntryPoint)).render

        store = (await import(ssrEntryPoint)).store
      }

      const appHtml = render(url)

      const state = store.getState()

      const preloadedState = `<script>window.__PRELOADED_STATE__  = ${JSON.stringify(
        state
      )}</script>`

      const html = template
        .replace(`<!--ssr-->`, appHtml)
        .replace('<!--state-->', preloadedState)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      isDev && vite.ssrFixStacktrace(e as Error)
    }
  })

  return { app }
}

createServer().then(({ app }) => app.listen(port))
