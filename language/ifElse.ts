import { Native, top, Type } from "./type.js"

export function ifElse<
  This extends Type<keyof any, any>,
  I extends top,
  E extends top,
>(
  this: This,
  if_: I,
  else_: E,
) {
  return Type("if_else", { if_, else_ })<I | E>
}
