import filenamify from 'filenamify'

export function toFolderName(packageName: string) {
  return filenamify(packageName.startsWith('@') ? packageName.split('/')[1] : packageName)
}
