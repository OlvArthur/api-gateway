import { UserEntity } from "@modules/users/entities/User";


export interface IRequestDTO {
  email: string
  password: string
}

export interface IAuthenticateUserService {
  execute(data: IRequestDTO): Promise<{ user: UserEntity, token: string }>
}
