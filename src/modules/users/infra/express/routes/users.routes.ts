import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'

import { createUserFactory } from '@modules/users/factory'
import { adaptExpressRouter } from '@shared/infra/express/adapters'

export const usersRouters = Router()

usersRouters.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required()
    })
  }),
  adaptExpressRouter(createUserFactory())
)
