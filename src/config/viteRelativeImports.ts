import { resolve } from 'path'


const r = (pathName: string) => resolve(__dirname, pathName)

export const importResolve: Record<string, string> = {
  '@config': r('../config'),
  '@shared': r('../shared'),
  '@modules': r('../modules')
}
