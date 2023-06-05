import { mockDeep, DeepMockProxy } from 'vitest-mock-extended'
import { PrismaClient } from '@shared/infra/prisma/client'

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => ({ prisma: mockDeep<PrismaClient>() })
