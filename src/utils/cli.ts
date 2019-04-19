export const hasParam = (param: string): boolean => {
  const index = process.argv.indexOf(`--${param}`)
  return index !== -1
}

export const getParam = (param: string, required: boolean = true): string | undefined => {
  const index = process.argv.indexOf(`--${param}`)
  if (index !== -1) return process.argv[index + 1]
  if (required) {
    console.error(`--${param} is required. Exiting!`)
    process.exit(1)
  }
  return undefined
}