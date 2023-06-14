import { UserEntity } from "@modules/users/entities/User"
import { ICreateUserRequestDTO } from "@modules/users/repositories"

export interface ICreateUserService {
  execute(data: ICreateUserRequestDTO): Promise<UserEntity>
}
