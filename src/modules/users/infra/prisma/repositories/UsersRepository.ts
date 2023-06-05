import { IUser } from "@modules/users/entities/User"
import { IFindOneUserRepository } from "@modules/users/repositories/IFindOneUserRepository"
import { Context, prisma as prismaClient } from "@shared/infra/prisma/ClientInstance"

class UsersRepository implements IFindOneUserRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const { prisma } = this.prismaContext

    const foundUser = prisma.user.findUnique({
      where: {
        email
      }
    })

    return foundUser
  }
}

export default UsersRepository
