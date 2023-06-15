import 'reflect-metadata'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'

import { AppError } from '@shared/errors'

import router from '@shared/infra/express/router'
import { rateLimiterRedis } from '@shared/infra/express/middlewares/RateLimiterRedis'
import { StatusCode } from '@shared/commons'
import { CelebrateError } from 'celebrate'


export const app = express()

const PORT = process.env.PORT ?? 5000

app.use(cors())
app.use(express.json())
app.use(rateLimiterRedis)
app.use(router)

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  console.log(err)
  const status = 'error'
  const message = err.message ?? 'Internal server error'

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status,
      message,
      details: err.details
    })
  }

  if(err instanceof CelebrateError) {
    const errBodyDetails = err.details.get('body')?.details || []
    const errQueryDetails = err.details.get('query')?.details || []

    const errDetails = errBodyDetails.concat(errQueryDetails)

    return response.status(StatusCode.BAD_REQUEST).json({
      status,
      message,
      details: errDetails.map(({ message, context }) => ({
        message,
        value: context?.value
      }))
    })
  }

  console.error(err);

  return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    status,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
