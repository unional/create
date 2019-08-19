import { ModuleError } from 'iso-error';

export class UnionalCreateError extends ModuleError {
  constructor(description: string, ...errors: Error[]) {
    super('@unional/create', description, ...errors)
  }
}

export class PackageNotFound extends UnionalCreateError {
  // istanbul ignore next
  constructor(public packageName: string) {
    super(`Package '${packageName}' is not installed.`)
  }
}

export class FolderNotFoundInPackage extends UnionalCreateError {
  // istanbul ignore next
  constructor(public packageName: string, public folder: string) {
    super(`Package '${packageName}' does not contain '${folder}' folder.`)
  }
}

export class TemplateHandlerNotFound extends UnionalCreateError {
  // istanbul ignore next
  constructor(public template: string) {
    super(`No template handler for ${template}`)
  }
}
