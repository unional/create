const common = require('@unional/create-monorepo/config/jest.common')

module.exports = {
  ...common,
  projects: [
    '<rootDir>/packages/*',
  ],
}
