import { type } from "./type.js"

export class u8 extends int(false, 8) {}
export class u16 extends int(false, 16) {}
export class u32 extends int(false, 32) {}
export class u64 extends int(false, 64) {}
export class i8 extends int(true, 8) {}
export class i16 extends int(true, 16) {}
export class i32 extends int(true, 32) {}
export class i64 extends int(true, 64) {}

function int<S extends boolean, B extends 8 | 16 | 32 | 64>(signed: S, bytes: B) {
  return class
    extends type(`${(signed ? "i" : "u") as S extends true ? "i" : "u"}${bytes}`)<number>
  {}
}
