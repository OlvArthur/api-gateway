import request from 'supertest'
import { describe, expect, it } from 'vitest'

import { StatusCode } from '@shared/commons'
import { app } from '@shared/infra/express/server'


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

})
