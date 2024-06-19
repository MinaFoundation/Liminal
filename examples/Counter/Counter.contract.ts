import * as L from "liminal"

export const count = L.u256.new(1)

export class By extends L.u256.or(L.None) {}

export class Increment extends L.F({ by: By }, function*({ by }) {
  const final = count.add(
    by.match(L.None, L.u256.new(1)),
  )
  yield IncrementedEvent.new({
    initial: count,
    final,
  })
  return yield* count.assign(final)
}) {}

export class IncrementedEvent extends L.Struct({
  tag: "Incremented",
  initial: L.u256,
  final: L.u256,
}) {}
