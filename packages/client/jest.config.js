import dotenv from 'dotenv'

dotenv.config()

const path = '<rootDir>/src/$1'

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '^@pages/(.*)$': path,
    '^@components/(.*)$': path,
    '^@assets/(.*)$': path,
    '^@store/(.*)$': path,
  },
}
