import { plainToInstance } from 'class-transformer'

import { UserEntity } from '@modules/users/entities/User'
import { IAuthenticateUserService } from '@modules/users/services/interfaces/IAuthenticateUserService'
import { BaseController } from '@shared/controller'
import { success } from '@shared/commons'
import { HttpRequest } from '@shared/interfaces'

class AuthenticateUserController implements BaseController {
  constructor(private authenticateUserService: IAuthenticateUserService){}

  async handle(httpRequest: HttpRequest) {
    const { email, password } = httpRequest.body

    const { token, user } = await this.authenticateUserService.execute({ email, password })

    return success({ token,user: plainToInstance(UserEntity, user) })
  }
}

export default AuthenticateUserController
