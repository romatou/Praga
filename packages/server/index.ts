import { createServer as createViteServer } from 'vite'
import dotenv from 'dotenv'
import cors from 'cors'
import fs from 'fs'
import path from 'path'

dotenv.config()

import express from 'express'
import { createClientAndConnect } from './db'
createClientAndConnect()

const app = express()
const port = Number(process.env.SERVER_PORT) || 3001

async function createServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)
  app.use(cors())
  app.use(
    express.static(path.resolve(__dirname, '../../client/dist/client/'), {
      index: false,
    })
  )

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    let template = fs.readFileSync(
      path.resolve(__dirname, '../../client/dist/client/index.html'),
      'utf-8'
    )
    template = await vite.transformIndexHtml(url, template)
    // @ts-ignore
    const render = (await import('../../client/dist/ssr/entry-server.cjs'))
      .SSRRender
    const appHtml = render(url)
    const html = template.replace(`<!--ssr-->`, appHtml)
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  })
  return { app, vite }
}

createServer().then(({ app }) =>
  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
    console.log(__dirname)
  })
)
