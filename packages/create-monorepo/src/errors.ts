import { ModuleError } from 'iso-error'

export class UnionalCreateBaseError extends ModuleError {
  constructor(description: string, ...errors: Error[]) {
    super('@unional/create', description, ...errors)
  }
}

export class InvalidPackageName extends UnionalCreateBaseError {
  constructor(public packageName: string, public reasons: string[]) {
    super(`'${packageName}' is not a valid npm package name.`)
  }
}
