module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^.+\\.css$': '<rootDir>/tests/MockImports.js'
  },
  transform: { '^.+\\.jsx?$': 'babel-jest', '^.+\\.css$': 'jest-transform-css' }
};
