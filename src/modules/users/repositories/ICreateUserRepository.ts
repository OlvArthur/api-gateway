import { IUser } from "@modules/users/entities/User"

export interface IRequestDTO {
  email: string
  password: string
  name: string
}

export interface ICreateUserRepository {
  create(data: IRequestDTO): Promise<IUser>
}
