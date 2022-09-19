export interface IUser {
  id: number
  email: string
  password: string
}

export interface IFindOneUserRepository {
  findByEmail(email: string): Promise<IUser | undefined> 
}
