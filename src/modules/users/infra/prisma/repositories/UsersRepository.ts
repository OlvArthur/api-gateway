import { UserEntity } from "@modules/users/entities/User"
import { IFindOneUserRepository, ICreateUserRepository, ICreateUserRequestDTO, IListManyUsersRepository } from "@modules/users/repositories"
import { Context, prisma as prismaClient } from "@shared/infra/prisma/ClientInstance"

export class UsersRepository implements IFindOneUserRepository, ICreateUserRepository, IListManyUsersRepository {
  prismaContext: Context

  constructor(ctx?: Context) {
    this.prismaContext = ctx ?? { prisma: prismaClient }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const { prisma } = this.prismaContext

    const foundUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return foundUser
  }

  async findMany(ids?: number[]): Promise<UserEntity[]> {
    const { prisma } = this.prismaContext

    const foundUsers = await prisma.user.findMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return foundUsers
  }

  async create(data: ICreateUserRequestDTO): Promise<UserEntity> {
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

