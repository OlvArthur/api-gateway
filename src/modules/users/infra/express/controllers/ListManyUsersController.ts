import { plainToInstance } from 'class-transformer'

import { success } from '@shared/commons'
import { BaseController } from '@shared/controller'
import { HttpRequest, HttpResponse } from '@shared/interfaces'

import { UserEntity } from '@modules/users/entities/User'
import { IListManyUsersService } from '@modules/users/services/interfaces/IListManyUsersService'

export class ListManyUsersControlller implements BaseController {
  constructor(private listManyUsersService: IListManyUsersService) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    let { idsToFilter } = httpRequest.query

    if(idsToFilter) idsToFilter = idsToFilter.split(',')

    const users = await this.listManyUsersService.execute(idsToFilter)

    return success(plainToInstance(UserEntity, users))
  }
}
