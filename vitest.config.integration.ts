import { defineConfig } from 'vitest/config'
import { importResolve } from './src/config/viteRelativeImports'

export default defineConfig({
  test: {
    include: ['src/tests/**/*.spec.ts'],
    threads: false, // avoid tests affecting each other on database interactions
    setupFiles: ['src/tests/helpers/setup.ts'],
  },
  resolve: {
    alias: importResolve
  }
})
