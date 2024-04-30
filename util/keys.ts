export type Keys<K extends Record<keyof any, keyof any>> = { new(): {} } & K
export function Keys<K extends Record<keyof any, keyof any>>(keys: K): Keys<K> {
  return Object.assign(class {}, keys)
}
