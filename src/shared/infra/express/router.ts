import { Router, Request } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

import { sessionRouter } from '@modules/users/infra/express/routes/sessions.routes'
import { usersRouters } from '@modules/users/infra/express/routes/users.routes'
import authMiddleware from '@modules/users/infra/express/middlewares/ValidateUserAuthMiddleware'
import proxyConfig from '@config/proxy'

const SERVICE_URL_TABLE = {
  maintenance: proxyConfig.maintenanceServiceUrl
}

const serviceProxy = (serviceKey: keyof typeof SERVICE_URL_TABLE) => createProxyMiddleware({
  target: SERVICE_URL_TABLE[serviceKey],
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req: Request) => {
      proxyReq.setHeader('x-user-id', String(req.user?.id))
      proxyReq.setHeader('x-user-role', req.user?.role)
      proxyReq.removeHeader('authorization')
    }
  }
})

const router = Router()

router.use('/login', sessionRouter)
router.use('/users', usersRouters)
router.use('/maintenance',authMiddleware, serviceProxy('maintenance'))


router.get('/health-check', (_, response) => {
  return response.json({ message: 'Hello world' })
})

export default router
