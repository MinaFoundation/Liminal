export function Tagged<K extends keyof any>(tag: K) {
  return class<M extends unknown = undefined> {
    readonly tag = tag
    constructor(readonly props: M = null!) {}
  }
}
