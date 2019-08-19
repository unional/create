export function getGitRepositoryName(remote: string | undefined) {
  if (remote) {
    return getFromHttpUrl(remote) || getFromSshUrl(remote)
  }
  return undefined
}

function getFromHttpUrl(url: string) {
  const match = /https?:\/\/(github|gitlab).com\/(.*)\.git/.exec(url)
  if (match) return match[2]
}


function getFromSshUrl(url: string) {
  const match = /git@.*:(.*)\.git/.exec(url)
  if (match) return match[1]
}
