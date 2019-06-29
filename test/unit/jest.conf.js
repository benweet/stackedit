const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^!raw-loader!': 'identity-obj-proxy',
    '^worker-loader!\\./templateWorker\\.js$': '<rootDir>/test/unit/mocks/templateWorkerMock',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '.*\\.(yml|html|md)$': 'jest-raw-loader',
  },
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: [
    '<rootDir>/test/unit/setup',
  ],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!**/node_modules/**',
  ],
  globals: {
    NODE_ENV: 'production',
  },
};
