import { sign } from 'jsonwebtoken'

import ITokenProvider from "../models/ITokenProvider";
import authConfig from '../../../../../config/auth'


export default class JWTTokenProvider implements ITokenProvider{
  generateToken(payload: string): string {
    const { secret, expiresIn } = authConfig.jwt
    
    const token = sign({}, secret, {
      expiresIn,
      subject: payload
    }) 

    return token
  }
}
