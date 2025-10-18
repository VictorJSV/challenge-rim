module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts?(x)', '**/*.test.ts?(x)'],
};
