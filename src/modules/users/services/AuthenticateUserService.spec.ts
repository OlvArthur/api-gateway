import { describe, beforeEach, it, expect } from 'vitest'

import { AppError } from '@shared/errors'

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import { FakeTokenProvider } from '@modules/users/providers/AuthTokenProvider/fakes/FakeTokenProvider'
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'


describe('When an user is authenticating', () => {
  let fakeUsersRepository: FakeUsersRepository
  let fakeTokenProvider: FakeTokenProvider
  let fakeHashProvider: FakeHashProvider
  let sut: AuthenticateUserService

  beforeEach(() => {
    fakeTokenProvider = new FakeTokenProvider()
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    sut = new AuthenticateUserService(fakeUsersRepository,fakeTokenProvider, fakeHashProvider)
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
    const createdUser = await fakeUsersRepository.create({
      email: 'jhon.doe@test.com',
      password: 'testPassword',
      name: 'Jhon Doe'
    })

    const userToAuthenticate = {
      email: createdUser.email,
      password: createdUser.password
    }

    const { user } = await sut.execute(userToAuthenticate)

    expect(user).toHaveProperty('id')
  });
})
