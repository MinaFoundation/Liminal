export function unimplemented(message?: string): never {
  if (message) console.error(message)
  throw 0
}
