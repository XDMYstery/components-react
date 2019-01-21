module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '\\.(css|less)$': './tests/styleMock.js',
  },
};
