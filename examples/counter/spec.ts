import * as L from "liminal"

export class MaybeU64 extends L.Option(L.u64) {}

export class Action extends L.enum({
  Add: MaybeU64,
  Subtract: MaybeU64,
  Divide: MaybeU64,
  Multiply: MaybeU64,
  Square: null!,
}) {}

export const act = new L.Method(Action, null!, L.u64)

export const count = L.item(L.u64)
