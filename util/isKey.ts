export function isKey(inQuestion: unknown): inQuestion is keyof any {
  return !!({
    number: true,
    string: true,
    symbol: true,
  } as Record<string, boolean>)[typeof inQuestion]
}
