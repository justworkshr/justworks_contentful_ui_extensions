module.exports = {
  verbose: true,
  moduleNameMapper: {
    '^../../custom_templates/$': '<rootDir>/tests/MockImports.js',
    '^../../shared/utilities/deepCopy$': '<rootDir>/tests/MockImports.js',
    '^@contentful/forma-36-react-components/dist/styles.css$': '<rootDir>/tests/MockImports.js',
    '^./index.css$': '<rootDir>/tests/MockImports.js',
    '^react-mde/lib/styles/css/react-mde-all.css$': '<rootDir>/tests/MockImports.js'
  },
  transform: { '^.+\\.jsx?$': 'babel-jest' }
};
