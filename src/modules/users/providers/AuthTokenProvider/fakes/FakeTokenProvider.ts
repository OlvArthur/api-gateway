import { ITokenProvider } from '@modules/users/providers/AuthTokenProvider/models/ITokenProvider'

export class FakeTokenProvider implements ITokenProvider {
  generateToken(payload: string): string {
    return payload
  }
}
