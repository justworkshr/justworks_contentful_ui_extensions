module.exports = {
  verbose: true,
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-css',
    '^.+\\.scss$': 'jest-transform-scss'
  }
};
