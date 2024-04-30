import * as L from "liminal"

const state = L.state(L.u64)

class Counter extends L.impl({
  add: L.method(L.u64, null!, L.u64),
  subtract: L.method(L.u64, null!, L.u64),
  square: L.method(null!, null!, L.u64),
  state,
}) {}

export default new Counter({
  *add(value) {
    const count = this.state.value()
    const next = count.add(value)
    return yield* this.state.set(next)
  },
  *subtract(value) {
    const count = this.state.value()
    const next = count.add(value)
    return yield* this.state.set(next)
  },
  *square() {
    const count = this.state.value()
    const next = count.square()
    return yield* this.state.set(next)
  },
})
