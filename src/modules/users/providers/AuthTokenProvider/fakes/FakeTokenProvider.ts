import { ITokenProvider, ITokenProviderRequest } from '@modules/users/providers/AuthTokenProvider/models/ITokenProvider'

export class FakeTokenProvider implements ITokenProvider {
  generateToken(payload: ITokenProviderRequest): string {
    return JSON.stringify(payload)
  }
}
