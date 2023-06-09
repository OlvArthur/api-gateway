import { defineConfig } from 'vitest/config'
import { importResolve } from './src/config/viteRelativeImports'

export default defineConfig({
  test: {
    exclude: ['**/tests/**', '**/.yarn/**']
  },
  resolve: {
    alias: importResolve,
  }
})
