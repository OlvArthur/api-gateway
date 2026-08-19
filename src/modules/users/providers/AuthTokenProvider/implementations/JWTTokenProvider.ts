import { sign } from 'jsonwebtoken'

import { ITokenProvider, ITokenProviderRequest } from '@modules/users/providers/AuthTokenProvider/models/ITokenProvider'
import authConfig from '@config/auth'


export default class JWTTokenProvider implements ITokenProvider{
  generateToken(payload: ITokenProviderRequest): string {
    const { secret, expiresIn } = authConfig.jwt
    
    const token = sign({}, secret, {
      expiresIn,
      subject: JSON.stringify(payload)
    }) 

    return token
  }
}
