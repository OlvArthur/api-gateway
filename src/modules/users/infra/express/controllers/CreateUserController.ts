import { ICreateUserService } from '@modules/users/services/interfaces/ICreateUserService'
import { created } from '@shared/commons'
import { BaseController } from '@shared/controller'
import { HttpRequest, HttpResponse } from '@shared/interfaces'

export class CreateUserController implements BaseController {
  constructor(private createUserService: ICreateUserService) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, name, password } = httpRequest.body

    const createdUser = await this.createUserService.execute({
      email,
      name,
      password
    })

    return created(createdUser)
  }
}
