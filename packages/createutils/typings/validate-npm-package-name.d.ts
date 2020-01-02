declare module 'validate-npm-package-name' {
  export default function validatePackageName(packageName: string): {
    validForNewPackages: boolean,
    validForOldPackages: boolean,
    errors: string[],
    warnings: string[],
  }
}
