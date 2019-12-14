module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/tests/MockImports.js'
  },
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-css'
  }
};
