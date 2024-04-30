import * as L from "liminal"

// TODO: solve for this signature without the redundancy
const x = L.Some(L.u8, 1)
const f = x.expect("Some", "EncounteredNone")
f.catch((x) => {
  return x.match({
    EncounteredNone() {
      return new L.u8(1)
    },
  })
})
const s = x.unwrap(new L.u8(1), "NoneFound")
const d = s.catch((value) => {
  return value.match({
    NoneFound(value) {
      return new L.u8(1)
    },
  })
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
