import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

export default defineConfig({
  plugins: [
    svelte({ hot: !process.env.VITEST }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    restoreMocks: true
  },
  moduleNameMapper: {
    "^\\$lib(.*)$": "<rootDir>/src/lib$1",
    "^\\$app(.*)$": ["<rootDir>/.svelte-kit/dev/runtime/app$1", "<rootDir>/.svelte-kit/build/runtime/app$1"]
  },
})