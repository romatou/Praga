import dotenv from 'dotenv'
import { pathsToModuleNameMapper } from 'ts-jest'
import { readFile } from 'fs/promises'

const { compilerOptions } = JSON.parse(
  await readFile(new URL('./tsconfig.json', import.meta.url))
)

dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
    }),
  },
}
