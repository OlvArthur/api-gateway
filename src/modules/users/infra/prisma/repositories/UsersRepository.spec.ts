import { describe, beforeEach, it, expect } from 'vitest'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'

import { createMockContext, MockContext } from '@shared/infra/prisma/__mocks__/ClientInstance'

let mockContext: MockContext
let sut: UsersRepository

describe('When a user is searched', () => {
  beforeEach(() => {
    mockContext = createMockContext()

    sut = new UsersRepository(mockContext)
  })

  it('should be allowed search by email', async () => {
    const userEmail = 'jhon.doe@test.com'

    await sut.findByEmail(userEmail)

    expect(mockContext.prisma.user.findUnique).toHaveBeenCalledOnce()
    expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          email: userEmail
        }
      })
    )
  })
})
