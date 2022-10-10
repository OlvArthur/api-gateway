
import { BaseController } from '@shared/controller'
import type { HttpRequest } from '@shared/interfaces'
import type { RequestHandler } from 'express'

export const adaptExpressRouter = (controller: BaseController): RequestHandler => {
  return async (req, res, next) => {
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
