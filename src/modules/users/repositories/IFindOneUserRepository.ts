import { IUser } from "@modules/users/entities/User"

export interface IFindOneUserRepository {
  findByEmail(email: string): Promise<IUser | null>
}
