import 'reflect-metadata'
import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'

import { AppError } from '@shared/errors'

import router from '@shared/infra/express/router'
import { StatusCode } from '@shared/commons'
import { CelebrateError } from 'celebrate'


export const app = express()

const PORT = process.env.PORT ?? 5000

app.use(express.json())

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
    return response.status(StatusCode.BAD_REQUEST).json({
      status,
      message,
      details: err.details.get('body')?.details.map(({ message, context }) => ({
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
