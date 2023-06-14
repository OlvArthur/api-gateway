import { UserEntity } from "@modules/users/entities/User"

export interface ICreateUserRequestDTO {
  email: string
  password: string
  name: string
}

export interface ICreateUserRepository {
  create(data: ICreateUserRequestDTO): Promise<UserEntity>
}
