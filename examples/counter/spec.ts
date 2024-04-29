import * as L from "liminal"

export class Action extends L.enum({
  Add: L.u64,
  Subtract: L.u64,
  Divide: L.u64,
  Multiply: L.u64,
  Square: null!,
}) {}

export const act = new L.Method(Action, null!, L.u64)

export const count = L.item(L.u64)
