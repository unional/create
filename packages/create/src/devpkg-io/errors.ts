import { BaseError } from 'make-error';

export class PackageNotFound extends BaseError {
  // istanbul ignore next
  constructor(public packageName: string) {
    super(`Package '${packageName}' is not installed.`)
  }
}

export class FolderNotFoundInPackage extends BaseError {
  // istanbul ignore next
  constructor(public packageName: string, public folder: string) {
    super(`Package '${packageName}' does not contain '${folder}' folder.`)
  }
}

export class TemplateHandlerNotFound extends BaseError {
  // istanbul ignore next
  constructor(public template: string) {
    super(`No template handler for ${template}`)
  }
}
