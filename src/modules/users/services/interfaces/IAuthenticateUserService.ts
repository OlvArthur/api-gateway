import { UserEntity } from "@modules/users/entities/User";


export interface IAuthenticateUserRequestDTO {
  email: string
  password: string
}

export interface IAuthenticateUserService {
  execute(data: IAuthenticateUserRequestDTO): Promise<{ user: UserEntity, token: string }>
}
