module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/?(*.)+(spec|test).ts'
  ],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  clearMocks: true,
  resetMocks: true
};