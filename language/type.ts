export function type<K extends keyof any>(tag: K) {
  return class<T> {
    readonly tag = tag
    constructor(readonly value: T) {}
  }
}
export type type<K extends keyof any, T> = new(value: T) => { tag: K }

export type top = type<any, any>
export type bottom = type<never, never>

export type Native<O extends top> = O extends new(value: infer T_) => any ? T_ : never
