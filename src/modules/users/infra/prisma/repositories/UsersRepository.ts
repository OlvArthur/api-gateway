import { IUser } from "@modules/users/entities/User"
import { IFindOneUserRepository, ICreateUserRepository, IRequestDTO } from "@modules/users/repositories"
import { Context, prisma as prismaClient } from "@shared/infra/prisma/ClientInstance"

export class UsersRepository implements IFindOneUserRepository, ICreateUserRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const { prisma } = this.prismaContext

    const foundUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return foundUser
  }

  async create(data: IRequestDTO): Promise<IUser> {
    const { prisma } = this.prismaContext
    const { email, name, password } = data

    const createdUser = await prisma.user.create({
      data: {
        email,
        name,
        password
      }
    })

    return createdUser
  }
}

