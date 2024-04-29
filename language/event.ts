export declare function event<K extends keyof any, T>(
  name: K,
  value: T,
): {
  name: K
  value: T
}
