module.exports = {
  collectCoverageFrom: [
    './src/**/*.js',
    './src/**/*.jsx',
    '!**/style.js',
    '!**/styles.js',
    '!**/*.config.js',
    '!**/*.page.js',
    '!**/config.js',
    '!**/enum.js',
    '!./src/App.js',
    '!./src/firbaseConfig.js',
    '!./src/i18n.js',
    '!./src/common/constants/*.js',
    '!./src/common/context/*.js',
    '!./src/routes/*.js',
    '!./src/theme/*.js',
    '!./src/assets/icons/*.js',
    '!./src/*.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    './src/App.js',
    '!*/__snapshots__',
    '!*/__mockData__',
    'setupTests.js',
    'preSetupTests.js',
    'react-app-env.d.js',
    'style.js',
    'styles.js',
    'story.js',
    'types.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  coverageReporters: ['lcov', 'text'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/test_mocks/style.mock.js',
  },
};
