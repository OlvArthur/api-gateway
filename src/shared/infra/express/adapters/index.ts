
import type { RequestHandler } from 'express'

import { BaseController } from '@shared/controller'
import type { HttpRequest } from '@shared/interfaces'

export const adaptExpressRouter = (controller: BaseController): RequestHandler => {
  return async (req, res, _) => {
    const request: HttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query
    }
    const { statusCode, body } = await controller.handle(request)
    return res.status(statusCode).json(body)
  }
}
