import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import fs from 'fs'
import helmet from 'helmet'
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware'
import path from 'path'
import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import router from './router'
import sequelize from './sequelize'
import htmlescape from 'htmlescape'
import cookieParser from 'cookie-parser';

dotenv.config()

sequelize()

const port = Number(process.env.SERVER_PORT) || 3001

async function createServer(isDev = process.env.NODE_ENV === 'development') {
  const app = express()
  app.use(cookieParser());
  app.disable('x-powered-by').enable('trust proxy')
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(router)

  const index = isDev
    ? fs.readFileSync(path.resolve(__dirname, '../client/index.html'), 'utf-8')
    : fs.readFileSync(
      path.resolve(__dirname, '../../client/dist/index.html'),
      'utf-8'
    )

  let vite: ViteDevServer
  let template = index
  let render: (url: string) => string
  let store: any

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

    render = (await vite.ssrLoadModule('../client/src/entry-server.tsx')).render

    store = (await vite.ssrLoadModule('../client/src/entry-server.tsx')).store

    app.use(vite.middlewares)
    app.use(cors())
  } else {
    app.use(
      express.static(path.resolve(__dirname, '../../client/dist'), {
        index: false,
      })
    )
  }

  if (!isDev) {
    const ssrEntryPoint = require.resolve(
      '../../client/dist/ssr/entry-server.cjs'
    )
    render = (await import(ssrEntryPoint)).render

    store = (await import(ssrEntryPoint)).store
  }

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(
    '/yandex-api',
    createProxyMiddleware({
      target: 'https://ya-praktikum.tech/api/v2/',
      changeOrigin: true,
      pathRewrite: { '^/yandex-api': '' },
      logLevel: 'info',
      cookieDomainRewrite: '',
      selfHandleResponse: false,
      onProxyReq: fixRequestBody,
      onError: (err: Error) => console.error(err),
    })
  )

  if (!isDev) {
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          'default-src':
            helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
          'script-src': [
            "'self'",
            "https: 'unsafe-inline'",
            'https://ya-praktikum.tech/api/v2/auth/user',
            'https://ya-praktikum.tech/api/v2/user/profile',
            'https://ya-praktikum.tech/api/v2/leaderboard/praga-v2',
            'https://ya-praktikum.tech/api/v2/resources/',
          ],

          'img-src': [
            `'self'`,
            `data:`,
            `https://ya-praktikum.tech/api/v2/resources/`,
          ],
        },
      })
    )
  }
 
  app.use('*', async (req: Request,res: Response) => {
    try {
      const url = req.originalUrl
      const state = store.getState()

      let appHtml;

      if(!req.cookies.authCookie && !req.cookies.uuid ) {
         appHtml = render('/auth')
      } else {
        appHtml = render(url)
      }
      if (isDev) {
        template = await vite.transformIndexHtml(url, template)
      }
      const preloadedState = `<script>window.__PRELOADED_STATE__  = ${htmlescape(
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
