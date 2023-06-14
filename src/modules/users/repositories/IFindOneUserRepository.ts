import { UserEntity } from "@modules/users/entities/User"

export interface IFindOneUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>
}
