export class AppError{
  constructor(public message: string,public statusCode = 400, public details = {}) {}
}

