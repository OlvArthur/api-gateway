import request from 'supertest'
import { beforeEach, describe,  expect,  it } from 'vitest'
import { hash } from 'bcryptjs'
import { verify } from 'jsonwebtoken'


import { app } from '@shared/infra/express/server'
import { StatusCode } from '@shared/commons'
import authConfig from '@config/auth'
import { prisma } from '@shared/infra/prisma/ClientInstance'


describe('/login', () => {

  describe('[POST] /login', () => {
    beforeEach(async () => {
      await prisma.user.create({
        data: {
          email: 'arthur.oliveira@gateway.com',
          name: 'arthur oliveira',
          password: await hash('testPassword', 8),
        }
      })
    })

    it('should return 200 as status code and authenticated user info', async () => {
      const { body: { message, data }, statusCode } = await request(app).post('/login').send({
          email:'arthur.oliveira@gateway.com',
          password: "testPassword"
      })


      expect(statusCode).toEqual(StatusCode.OK)
      expect(message).toEqual('request_successfully_completed')
      expect(data).toHaveProperty('user')
      expect(data).toHaveProperty('token')
      expect(verify(data.token, authConfig.jwt.secret))
    })

    it('should return 400 as status code if the email does not exist', async () => {
      const { body: { message, status }, statusCode } = await request(app).post('/login').send({
        email:'wrong.email@test.com',
        password: "testPassword"
      })

      expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
      expect(message.toLowerCase()).toEqual('Login failed: Invalid username or password'.toLowerCase())
      expect(status.toLowerCase()).toEqual('error'.toLowerCase())
    })

    it('should return 400 as status code if the email exists, but the password is incorrect', async () => {
      const { body: { message, status }, statusCode } = await request(app).post('/login').send({
        email: 'arthur.oliveira@gateway.com',
        password: "wrong password"
      })

      expect(statusCode).toEqual(StatusCode.BAD_REQUEST)
      expect(message.toLowerCase()).toEqual('Login failed: Invalid username or password'.toLowerCase())
      expect(status.toLowerCase()).toEqual('error'.toLowerCase())
    })
  })
})

