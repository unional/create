import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		globals: true,
		environment: 'node',
		include: ['packages/*/src/**/*.{spec,test,unit,accept,integrate,system}.ts'],
		coverage: {
			provider: 'v8',
			include: ['packages/*/src/**/*.ts'],
			exclude: ['packages/*/src/bin.ts', 'packages/*/src/**/*.browser.ts'],
			reporter: ['text', 'lcov'],
		},
	},
})
