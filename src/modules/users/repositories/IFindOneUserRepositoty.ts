export interface IUser {
  email: string
  password: string
}

export interface IFindOneUserRepository {
  findByEmail(email: string): Promise<IUser | undefined> 
}
