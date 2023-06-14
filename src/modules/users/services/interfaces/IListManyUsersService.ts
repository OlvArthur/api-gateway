import { UserEntity } from "@modules/users/entities/User";

export interface IListManyUsersService {
  execute(ids?: string[] | number[]): Promise<UserEntity[]>
}
