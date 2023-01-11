import { Router } from 'express'

import themesRoutes from './themesRoutes'
import topicsRouter from './ForumRoutes'

const router: Router = Router()

themesRoutes(router)
topicsRouter(router)


export default router
