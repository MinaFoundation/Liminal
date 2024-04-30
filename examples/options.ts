import * as L from "liminal"

const x = L.Some(L.u8, 1)
const f = x.expect("Some", "EncounteredNone")
L.catch(f, {
  EncounteredNone() {
    return new L.u8(1)
  },
})
const s = x.unwrap(new L.u8(1), "NoneFound")
const d = L.catch(s, {
  NoneFound(value) {
    return new L.u8(1)
  },
})
const g = x.unwrapOr(1)
const y = x.match({
  None() {
    return new L.u8(0)
  },
  Some(value) {
    return value
  },
})
