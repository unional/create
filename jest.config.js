const common = require('@unional/monorepo-scripts/config/jest.common')

module.exports = {
  ...common,
  projects: [
    '<rootDir>/packages/*',
  ],
}
