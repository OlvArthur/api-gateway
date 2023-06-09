import { Router } from 'express'

import { sessionRouter } from '@modules/users/infra/express/routes/sessions.routes'
import { usersRouters } from '@modules/users/infra/express/routes/users.routes'

const router = Router()

router.use('/login', sessionRouter)
router.use('/users', usersRouters)

router.get('/health-check', (_, response) => {
  return response.json({ message: 'Hello world' })
})

export default router
