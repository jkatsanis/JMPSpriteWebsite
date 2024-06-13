module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1'
  },
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  }
};
