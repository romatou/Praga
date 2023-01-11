import { Router } from 'express'
import { create, get, update } from '../controllers/ThemeAPI'

const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router()

  themesRouter
    .get('/get', [], get)
    .post('/add', [], create)
    .post('/update', [], update)

  router.use('/api/theme', themesRouter)
}

export default themesRoutes
