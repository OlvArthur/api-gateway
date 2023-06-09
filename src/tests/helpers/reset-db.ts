import { PrismaClient } from '../../shared/infra/prisma/client'

const prisma = new PrismaClient()

export default async () => {
  await prisma.$transaction([
    prisma.user.deleteMany(),
  ])
}
