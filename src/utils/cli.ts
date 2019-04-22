export const log = console.log
export const info = console.info
export const error = console.error
export const exit = (error: boolean = false) => process.exit(error ? 1 : 0)

export const hasParam = (param: string): boolean => {
  const index = process.argv.indexOf(`--${param}`)
  return index !== -1
}

export const hasParams = (...params: string[]): boolean => params
  .map(hasParam)
  .some(Boolean)

export const getParam = (param: string, required: boolean = true): string | undefined => {
  const index = process.argv.indexOf(`--${param}`)
  if (index !== -1) return process.argv[index + 1]
  if (required) {
    error(`--${param} is required. Exiting!`)
    exit(true)
  }
  return undefined
}

export const getParamWithDefault = (param: string, defaultValue: string): string => getParam(param, false) || defaultValue
