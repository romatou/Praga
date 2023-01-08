import { Router } from 'express'

import themesRoutes from './themesRoutes'

const router: Router = Router()

themesRoutes(router)

export default router
