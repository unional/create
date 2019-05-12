const isCI = require('is-ci')
module.exports = isCI ? {
  'preset': 'ts-jest',
  'roots': [
    '<rootDir>/src'
  ],
  'reporters': [
    'default',
    [
      'jest-junit',
      {
        'output': '.reports/junit/js-test-results.xml'
      }
    ],
  ],
  'testEnvironment': 'node',
  'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)']
} : {
    'preset': 'ts-jest',
    'globals': {
      'ts-jest': {
        'diagnostics': false
      }
    },
    'collectCoverageFrom': [
      '<rootDir>/src/**/*.[jt]s',
      '!<rootDir>/src/bin.[jt]s'
    ],
    'reporters': [
      'default',
      'jest-progress-tracker',
      ['jest-audio-reporter', { volume: 0.3 }],
    ],
    'roots': [
      '<rootDir>/src'
    ],
    'testEnvironment': 'node',
    'testMatch': ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
    'watchPlugins': [
      'jest-watch-suspend',
      'jest-watch-repeat',
      'jest-watch-typeahead/filename',
      'jest-watch-typeahead/testname',
      [
        'jest-watch-toggle-config', { 'setting': 'verbose' }
      ],
      [
        'jest-watch-toggle-config', { 'setting': 'collectCoverage' }
      ]
    ]
  }
