export interface ITokenProviderRequest {
  id: number
  role: 'MECHANIC' | 'ADMIN'
}

export interface ITokenProvider {
  generateToken(payload: ITokenProviderRequest): string
}
