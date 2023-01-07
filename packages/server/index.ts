import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import sequelize from './sequelize'
import { themeRouter } from './controllers/siteTheme'

dotenv.config()

sequelize()

const port = Number(process.env.SERVER_PORT) || 3001

async function createServer(isDev = process.env.NODE_ENV === 'development') {
  const index = isDev
    ? fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8')
    : fs.readFileSync(
      path.resolve(__dirname, '../../client/dist/client/index.html'),
      'utf-8'
    )

  const app = express()

  app
    .disable('x-powered-by')
    .enable('trust proxy')
    // .set('query parser', queryParser)
    // .use(cookieParser())
    // .use(logger)
    // .use(router)
    // .use(notFound); 

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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/theme', themeRouter)
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
