export function Tagged<K extends keyof any>(tag: K) {
  return class {
    readonly tag = tag
  }
}
