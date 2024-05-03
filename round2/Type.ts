export declare function Type<T extends AnyType>(
  name: T["name"],
  metadata: T["metadata"],
  instance: new() => T["instance"],
): T

export interface Type<K extends string, N, M, D, C extends AnyType> {
  name: K
  native: N
  metadata: M
  instance: D
  conversion: C
  lift(native: N): D
}

export interface AnyType extends Type<any, any, any, any, any> {}

export interface AnyInstance extends Instance<any> {}

export class Instance<T extends AnyType> {
  declare type: T

  declare assertEquals: <E extends AnyInstance>(
    expect: this,
    error: E,
  ) => E

  declare into: <N extends T["conversion"]>(ty: N) => N["instance"]
}

// export interface Effect<Y extends Variant, O extends AnyVal> extends Generator<Y, O> {
//   tag: "Effect"
// }

// interface u32 extends Ty<"u32", number, {}, {}, never> {}
// const u32 = ty<u32>("u32", {}, {})

// interface u16 extends Ty<"u16", number, {}, {}, u32> {}
// const u16 = ty<u16>("u16", {}, {})

// interface u8 extends
//   Ty<"u8", number, {}, {
//     something(): Generator<Val<AssertError<"sup">>, void>
//   }, u16 | u32>
// {}
// const u8: u8 = ty("u8", {}, {
//   *something() {
//     yield this.assertEquals(u8(1), "sup" as const)
//   },
// })

// interface unrelated extends Ty<"unrelated", number, {}, {}, never> {}
// const unrelated = ty<unrelated>("unrelated", {}, {})

// const x = u8(1)
// const y = x.into(u32)

// {
//   interface a extends
//     Ty<"a", number, {}, {
//       add(value: "test"): "thing"
//     }, b>
//   {}
//   const a: a = ty("a", {}, {
//     add(value) {
//       return "thing"
//     },
//   })
//   const g = a(1).misc.add("test")

//   interface b extends Ty<"b", number, {}, {}, a> {}
//   const b: b = ty("b", {}, {})

//   const x = b(1).into(a).into(b).into(a).into(b).into(a).misc.add("test")
// }
