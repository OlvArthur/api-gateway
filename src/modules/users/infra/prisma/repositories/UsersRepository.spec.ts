import { describe, beforeEach, it, expect } from 'vitest'

import { UsersRepository } from '@modules/users/infra/prisma/repositories/UsersRepository'

import { createMockContext, MockContext } from '@shared/infra/prisma/__mocks__/ClientInstance'

let mockContext: MockContext
let sut: UsersRepository

beforeEach(() => {
  mockContext = createMockContext()

  sut = new UsersRepository(mockContext)
})

describe('When an user is searched', () => {
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

describe('When multiple users are searched', () => {
  it('should not apply ids filter when no ids are provided',async () => {
    await sut.findMany()

    mockContext.prisma.user.findMany.mockResolvedValue([
      {
        id: 1,
        email: 'jhondoe@test.com',
        name: 'Jhon Doe',
        password: 'testPassword'
      },
      {
        id: 2,
        email: 'janedoe@test.com',
        name: 'Jane Doe',
        password: 'testPassword'
      }
    ])

    expect(mockContext.prisma.user.findMany).toHaveBeenNthCalledWith(1,
      expect.objectContaining({
        where: {
          id: {
            in: undefined
          }
        }
      })
    )
  })

  it('should apply ids filter when ids are provided',async () => {
    await sut.findMany([1,3])

    mockContext.prisma.user.findMany.mockResolvedValue([
      {
        id: 1,
        email: 'jhondoe@test.com',
        name: 'Jhon Doe',
        password: 'testPassword'
      },
      {
        id: 2,
        email: 'janedoe@test.com',
        name: 'Jane Doe',
        password: 'testPassword'
      }
    ])

    expect(mockContext.prisma.user.findMany).toHaveBeenNthCalledWith(1,
      expect.objectContaining({
        where: {
          id: {
            in: [1,3]
          }
        }
      })
    )
  })

})
