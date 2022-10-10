import { HttpResponse } from '@shared/interfaces'
import { StatusCode } from '@shared/commons'

export const success = (data: any, message?: string, statusCode?: number): HttpResponse => ({
  statusCode: statusCode ?? StatusCode.OK,
  body: {
    message: message ?? 'request_successfully_completed',
    data: data
  }
})

export const created = (data: any, message?: string): HttpResponse => ({
  statusCode: StatusCode.CREATED,
  body: {
    message: message ?? 'request_successfully_created',
    data: data
  }
})

export const deleted = (message?: string): HttpResponse => ({
  statusCode: StatusCode.OK,
  body: {
    message: message ?? 'request_successfully_completed'
  }
})
