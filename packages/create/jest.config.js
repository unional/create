module.exports = {
  'preset': 'ts-jest',
  'globals': {
    'ts-jest': {
      'diagnostics': false,
    },
  },
  'collectCoverageFrom': [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/bin.ts',
    '!<rootDir>/src/commands/**/*',
  ],
  'reporters': [
    'default',
    'jest-progress-tracker',
    ['jest-audio-reporter', { volume: 0.3 }],
  ],
  'roots': [
    '<rootDir>/src',
  ],
  'testEnvironment': 'node',
  'watchPlugins': [
    'jest-watch-suspend',
    'jest-watch-repeat',
    [
      'jest-watch-toggle-config', { 'setting': 'verbose' },
    ],
    [
      'jest-watch-toggle-config', { 'setting': 'collectCoverage' },
    ],
  ],
}
