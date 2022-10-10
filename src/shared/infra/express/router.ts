import { Router } from 'express'

import { sessionRouter } from '@modules/users/infra/express/routes/sessions.routes'

const router = Router()

router.use('/login', sessionRouter)

router.get('/health-check', (_, response) => {
  return response.json({ message: 'Hello world' })
})

export default router
