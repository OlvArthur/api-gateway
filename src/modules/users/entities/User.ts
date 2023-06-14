import { Exclude } from 'class-transformer'

import { User } from '@shared/infra/prisma/client'

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }

  id: number

  email: string

  name: string

  @Exclude()
  password: string

}
