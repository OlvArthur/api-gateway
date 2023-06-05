import { describe, beforeEach, it, expect } from 'vitest'

import { AppError } from '@shared/errors/AppError'

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { IFindOneUserRepository } from '@modules/users/repositories/IFindOneUserRepository'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import { FakeTokenProvider } from '@modules/users/providers/AuthTokenProvider/fakes/FakeTokenProvider'
import { ITokenProvider } from '@modules/users/providers/AuthTokenProvider/models/ITokenProvider'


describe('When a user is authenticating', () => {
  let fakeUsersRepository: IFindOneUserRepository
  let fakeTokenProvider: ITokenProvider
  let sut: AuthenticateUserService

  beforeEach(() => {
    fakeTokenProvider = new FakeTokenProvider()
    fakeUsersRepository = new FakeUsersRepository()

    sut = new AuthenticateUserService(fakeUsersRepository,fakeTokenProvider)
  });

  it('should throw error if email is not provided', async () => {

    const userToAuthenticate = {
      email: '',
      password: 'testPassword'
    }

    Object.assign(userToAuthenticate, {
      email: null
    })

    await expect(sut.execute(userToAuthenticate)).rejects.toStrictEqual(new AppError('Login Failed: No email informed'))
  })

  it('should throw error if password is not provided', async () => {

    const userToAuthenticate = {
      email: 'jhondoe@test.com',
      password: ''
    }

    Object.assign(userToAuthenticate, {
      password: null
    })

    await expect(sut.execute(userToAuthenticate)).rejects.toStrictEqual(new AppError('Login Failed: No password informed'))
  })

  it('should not be able to authenticate with a non existing email', async () => {
    const userToAuthenticate = {
      email: 'inexistent.email@example.com',
      password: '123456',
    }

    await expect(sut.execute(userToAuthenticate)).rejects.toBeInstanceOf(AppError)
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const userToAuthenticate = {
      email: 'jhon.doe@test.com',
      password: 'wrong-password',
    }

    await expect(sut.execute(userToAuthenticate)).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to authenticate', async () => {
    const userToAuthenticate = {
      email: 'jhon.doe@test.com',
      password: 'testPassword',
    }

    const { user } = await sut.execute(userToAuthenticate)

    expect(user).toHaveProperty('id')
  });
})
