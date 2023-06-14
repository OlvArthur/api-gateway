import { UserEntity } from "@modules/users/entities/User"

export interface IRequestDTO {
  email: string
  password: string
  name: string
}

export interface ICreateUserService {
  execute(data: IRequestDTO): Promise<UserEntity>
}
