import { readFile, writeFile } from 'fs'
import { promisify } from 'util';
import path from 'path'
import R from 'ramda'
import { exec } from 'child_process';

const execp = promisify(exec)
const readFilep = promisify(readFile)
const writeFilep = promisify(writeFile)

export async function initializeFolder(inputs: any, cwd = process.cwd()) {
  const templates = await readTemplates()
  await writeFilep(
    path.resolve(cwd, 'LICENSE'),
    applyVariables(
      templates['LICENSE'],
      R.pick(['year', 'gitUsername', 'gitEmail'], inputs)
    )
  )
  await writeFilep(
    path.resolve(cwd, 'package.json'),
    applyVariables(
      templates['package.json'],
      R.pick(['name', 'repository', 'gitUsername', 'gitEmail'], inputs)
    )
  )
  await writeFilep(
    path.resolve(cwd, 'README.md'),
    applyVariables(
      templates['README.md'],
      R.pick(['name', 'repository'], inputs)
    )
  )

  if (!inputs.isGitRepo) {
    await execp(`git init`, { cwd })
  }

  if (inputs.noRemote) {
    await execp(`git remote add origin https://${inputs.host}/${inputs.repository}.git`, { cwd })
  }
}

async function readTemplates() {
  return {
    'LICENSE': await readFilep(path.resolve(__dirname, '../../artifacts/templates/LICENSE'), 'utf-8'),
    'package.json': await readFilep(path.resolve(__dirname, '../../artifacts/templates/package.json'), 'utf-8'),
    'README.md': await readFilep(path.resolve(__dirname, '../../artifacts/templates/README.md'), 'utf-8'),
  }
}

function applyVariables(content: string, inputs: Record<string, any>) {
  return Object.keys(inputs).reduce((p, name) => {
    const value = inputs[name]
    return p.replace(new RegExp(`\\[${name}\\]`, 'g'), value)
  }, content)
}
