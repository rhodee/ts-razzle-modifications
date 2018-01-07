/**
 * Determine if the current environment is Development.
 * Absent any value always assert that development is current environment.
 * @param env
 * @returns boolean
 */
export function isDev (env: boolean | string | undefined): boolean {
  const vv = Boolean(env)
  if (vv === undefined) return true

  if (typeof env === 'string') {
    const valPresent = env.length
    if (env === 'production' || valPresent === 0) return true
    if (env !== 'production') return false
  }

  if (typeof env === 'boolean') {
    return env
  }

  return true
}

export function isServer (target: string): boolean {
  return target === 'node'
}

export function isClient (target: string): boolean {
  return target !== 'node'
}
