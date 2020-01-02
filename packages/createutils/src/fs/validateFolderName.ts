export function validateFolderName(folderName: string): string[] | undefined {
  if (folderName.trim().length === 0) {
    return ['folder name length cannot be zero']
  }

  const slashIndex = folderName.indexOf('/') + folderName.indexOf('\\')
  if (slashIndex >= 0) {
    return ['folder name cannot contain ']
  }
  return
}
