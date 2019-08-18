import fs from 'fs'
import path from 'path'

export function getVersion() {
  const pjson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))
  return pjson.version
}
