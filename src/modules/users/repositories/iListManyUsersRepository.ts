import { UserEntity } from '@modules/users/entities/User'

export interface IListManyUsersRepository {
  findMany(ids?: number[]): Promise<UserEntity[]>
}
