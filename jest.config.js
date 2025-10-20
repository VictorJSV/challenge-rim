module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(svg)\\?react$': '<rootDir>/src/__mocks__/svgMock.tsx',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.spec.ts?(x)', '**/*.test.ts?(x)'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
