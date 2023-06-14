import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

import { StatusCode } from '@shared/commons'
import { app } from '@shared/infra/express/server'
import { prisma } from '@shared/infra/prisma/ClientInstance'
import { UserEntity } from '@modules/users/entities/User'


describe('/users', () => {

  describe('[POST] /users', () => {

    it('should create a user', async () => {
      const { body: { message, data }, statusCode } = await request(app).post('/users').send({
        name: 'Jhon Doe',
        email: 'jhondoe@gateway.com',
        password: 'testPassword'
      })

      expect(statusCode).toEqual(StatusCode.CREATED)
      expect(message).toEqual('request_successfully_created')
      expect(data).toHaveProperty('id')
      expect(data.email).toStrictEqual('jhondoe@gateway.com')
    })
  })

  describe('[GET] /users', () => {
    let firstCreatedUser: UserEntity
    beforeEach(async () => {
      firstCreatedUser = await prisma.user.create({
        data: {
          email: 'jhon.doe@test.com',
          name: 'Jhon Doe',
          password: '$2a$08$ImAba5YzJed73w/Qq4fX5OqGuM7tjajrMFM72e/6Ygh74TmjUNa3S'
        }
      })

      await prisma.user.create({
        data: {
          email: 'jane.doe@test.com',
          name: 'Jane Doe',
          password: '$2a$08$ImAba5YzJed73w/Qq4fX5OqGuM7tjajrMFM72e/6Ygh74TmjUNa3S'
        }
      })
    })

    it('should return all users when no id filter is provided', async () => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jhon.doe@test.com',
        password: 'testPassword'
      })

      const { body, statusCode } = await request(app).get('/users').set({ Authorization: `Bearer ${token}`})

      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.length).toEqual(2)
      expect(body.data[0].email).toEqual('jhon.doe@test.com')
    })

    it('should return only users filtered by provided id filter', async () => {
      const { body: { data: { token } } } = await request(app).post('/login').send({
        email: 'jhon.doe@test.com',
        password: 'testPassword'
      })

      const { body, statusCode } = await request(app).get('/users').set({ Authorization: `Bearer ${token}`}).query({
        idsToFilter: firstCreatedUser.id
      })


      expect(statusCode).toEqual(StatusCode.OK)
      expect(body.data.length).toEqual(1)
      expect(body.data[0].email).toEqual('jhon.doe@test.com')
    })

  })

})
