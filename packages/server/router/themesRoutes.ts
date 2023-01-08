import ThemeAPI from '../controllers/ThemeAPI'
import { Router } from 'express'

const themesRoutes = (router: Router) => {
  const themesRouter: Router = Router()

  // themesRouter.route('/get').get(ThemeAPI.get);
  // themesRouter.route('/add').post(ThemeAPI.create);
  // themesRouter.route('/update').post(ThemeAPI.update);

  themesRouter
    .get('/get', [], ThemeAPI.get)
    .post('/add', [], ThemeAPI.create)
    .post('/update', [], ThemeAPI.update)

  router.use('/api/theme', themesRouter)
}

export default themesRoutes
