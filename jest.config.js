module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',  // Utiliza babel-jest para transformar archivos JSX
  },
  moduleFileExtensions: ['js', 'jsx'],
};
