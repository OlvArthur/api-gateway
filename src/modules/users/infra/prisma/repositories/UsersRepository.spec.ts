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

describe('When an user is created', () => {
  beforeEach(() => {
    mockContext = createMockContext()

    sut = new UsersRepository(mockContext)
  })

  it('should return a create whith provided info', async () => {
    const userToCreate = {
      name: 'Jhon Doe',
      email: 'jhondoe@test.com',
      password: 'testPassword'
    }

    await sut.create(userToCreate)

    mockContext.prisma.user.create.mockResolvedValue({
      email: userToCreate.email,
      name: userToCreate.name,
      password: userToCreate.password,
      id: 1
    })

    expect(mockContext.prisma.user.create).toHaveBeenNthCalledWith(1,
      expect.objectContaining({
        data: {
          email: userToCreate.email,
          name: userToCreate.name,
          password: userToCreate.password,
        }
      })
    )
  })
})
