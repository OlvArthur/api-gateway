import { beforeEach, describe, it, expect } from 'vitest'

import { ICreateUserRepository, IFindOneUserRepository } from '@modules/users/repositories'
import { CreateUserService } from '@modules/users/services/CreateUserService'
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider'
import { FakeHashProvider } from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

describe('When an user is created', () => {
  let fakeUsersRepository: ICreateUserRepository & IFindOneUserRepository
  let fakeHashProvider: IHashProvider
  let sut: CreateUserService

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    sut = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should fail if the email is not provided', async () => {
    const userToCreate = {
      email: '',
      password: 'testPassword',
      name: 'Jhon Doe'
    }

    Object.assign(userToCreate, {
      email: null
    })

    await expect(sut.execute(userToCreate)).rejects.toStrictEqual(new AppError('Create User Error: Missing email'))
  })

  it('should fail if the password is not provided', async () => {
    const userToCreate = {
      password: '',
      email: 'jhondoe@test.com',
      name: 'Jhon Doe'
    }

    Object.assign(userToCreate, {
      password: null
    })

    await expect(sut.execute(userToCreate)).rejects.toStrictEqual(new AppError('Create User Error: Missing password'))
  })

  it('should fail if the name is not provided', async () => {
    const userToCreate = {
      name: '',
      password: 'testPassword',
      email: 'jhondoe@test.com'
    }

    Object.assign(userToCreate, {
      name: null
    })

    await expect(sut.execute(userToCreate)).rejects.toStrictEqual(new AppError('Create User Error: Missing name'))
  })

  it('should fail when the email already exists', async () => {
    const createdUser = await fakeUsersRepository.create({
      email: 'jhondoe@test.com',
      name: 'Jhon Doe',
      password: 'testPassword'
    })

    const newUserToCreate = { email:  createdUser.email, name: 'Jane Doe', password: 'testPassword' }

    await expect(sut.execute(newUserToCreate)).rejects.toBeInstanceOf(AppError)
  })

  it('should create an user', async () => {
    const userToCreate = {
      email: 'jhondoe@test.com',
      name: 'Jhon Doe',
      password: 'testPassword'
    }

    const createdUser = await sut.execute(userToCreate)

    expect(createdUser).toHaveProperty('id')
  })
})
