import { Router } from 'express'

import { createUserFactory } from '@modules/users/factory'
import { adaptExpressRouter } from '@shared/infra/express/adapters'

export const usersRouters = Router()

usersRouters.post('/', adaptExpressRouter(createUserFactory()))
