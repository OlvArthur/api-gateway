import { beforeEach, describe, expect, it } from 'vitest'

import { ListManyUsersService } from '@modules/users/services/ListManyUsersService'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'

describe('When multiples users are searched', () => {
  let fakeUsersRepository: FakeUsersRepository
  let sut: ListManyUsersService

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()

    sut = new ListManyUsersService(fakeUsersRepository)

    await fakeUsersRepository.create(
      {
        email: 'jhondoe@test.com',
        name: 'Jhon Doe',
        password: 'testPassword'
      }
    )
    await fakeUsersRepository.create(
      {
        email: 'janedoe@test.com',
        name: 'Jane Doe',
        password: 'testPassword'
      }
    )
  })

  it('should return all user when no id filter is provided', async () => {
    const foundUsers = await sut.execute()

    expect(foundUsers).toHaveLength(2)
    expect(foundUsers[0].email).toEqual('jhondoe@test.com')
    expect(foundUsers[1].email).toEqual('janedoe@test.com')
  })

  it('should return only wanted users when id filter is provided', async () => {
    const foundUsers = await sut.execute([1])

    expect(foundUsers).toHaveLength(1)
    expect(foundUsers[0].email).toEqual('jhondoe@test.com')
  })

  it('should parse string ids into number ids', async () => {
    const foundUsers = await sut.execute(['1', '2'])

    expect(foundUsers).toHaveLength(2)
    expect(foundUsers[0].email).toEqual('jhondoe@test.com')
    expect(foundUsers[1].email).toEqual('janedoe@test.com')
  })
})

