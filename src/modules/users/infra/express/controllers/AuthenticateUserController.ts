import { Request, Response } from 'express'

import IAuthenticateUserService from '../../../services/interfaces/IAuthenticateUserService'

class AuthenticateUserController {
  constructor(private authenticateUserService: IAuthenticateUserService){}

  public async execute(request: Request, response: Response) {
    const { email } = request.body

    const token = await this.authenticateUserService.execute(email)

    
    return response.json({ token })
  }
}

export default AuthenticateUserController
