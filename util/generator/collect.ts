export type Collected<Y, R> = [Y[], R]

export function collect<Y, R>(generator: Generator<Y, R>): Collected<Y, R> {
  const statements: Y[] = []
  let result: R
  statements: while (true) {
    const next = generator.next()
    if (next.done) {
      result = next.value
      break statements
    } else {
      statements.push(next.value)
    }
  }
  return [statements, result]
}
