import { IAuthenticateUserService } from '@modules/users/services/interfaces/IAuthenticateUserService'
import { BaseController } from '@shared/controller'
import { success } from '@shared/commons'
import { HttpRequest } from '@shared/interfaces'

class AuthenticateUserController implements BaseController {
  constructor(private authenticateUserService: IAuthenticateUserService){}

  async handle(httpRequest: HttpRequest) {
    const { email } = httpRequest.body

    const { token, user } = await this.authenticateUserService.execute(email)

    return success({ token,user })
  }
}

export default AuthenticateUserController
