import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

import authConfig from '@config/auth'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

const validatedUserAuth = (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers
  
  if(!authorization) throw new Error('Missing JWT token')

  const [, token] = authorization?.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new Error('Invalid JWT token')
  }
}

export default validatedUserAuth
