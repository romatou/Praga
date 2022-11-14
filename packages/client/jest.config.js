import dotenv from 'dotenv'

dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
    '^@pages/(.*)$': '<rootDir>/@pages/$1',
    '^@components/(.*)$': '<rootDir>/@components/$1',
    '^@assets/(.*)$': '<rootDir>/@assets/$1',
    '^@store/(.*)$': '<rootDir>/@store/$1',
  },
}
