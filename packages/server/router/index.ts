import { Router } from 'express'

import themesRoutes from './themesRoutes'
import topicsRouter from './forumRoutes'

const router: Router = Router()

themesRoutes(router)
topicsRouter(router)


export default router
