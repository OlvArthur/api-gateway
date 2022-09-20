import { IFindOneUserRepository, IUser } from "@modules/users/repositories/IFindOneUserRepository"

class UsersRepository implements IFindOneUserRepository {
  private users: IUser[] = [{
    id: 1,
    email:'arthur.oliveira@gateway.br',
    password: '12345'
  }]

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const foundUser = this.users.find(user => user.email === email)

    return foundUser
  }
}

export default UsersRepository
