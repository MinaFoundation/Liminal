import { Effect } from "./f.js"
import { u8 } from "./int.js"
import { struct } from "./struct.js"
import { Any, Type, TypeNative } from "./type.js"

export type union<A extends Variant[]> = ReturnType<typeof union<A>>
export function union<A extends Variant[]>(
  ...variantTypes: EnsureVariants<A>
) {
  return class Variant extends Type("union", { variantTypes })<VariantNative<A[number]>> {
    static from(variant: VariantFrom<A[number]>) {
      return new this(null!)
    }

    declare when: <M extends A[number], Y>(
      match: M,
      f: (value: VariantValue<M>) => Generator<Y, void>,
    ) => Effect<Y, void>

    declare match: () => Matcher<A[number]>
  }
}

export type Variant = keyof any | Any

export type EnsureVariants<V extends Variant[]> = V

export type VariantNative<V extends Variant> = V extends keyof any ? TaggedNative<V>
  : V extends Any ? TypeNative<V>
  : never

export type VariantValue<V extends Variant = any> = V extends keyof any ? InstanceType<tagged<V>>
  : V extends Any ? InstanceType<V>
  : never

export type VariantFrom<V extends Variant> =
  | (V extends keyof any ? V : never)
  | VariantValue<V>
  | VariantNative<V>

export interface tagged<K extends keyof any> extends ReturnType<typeof tagged<K>> {}
export function tagged<K extends keyof any>(tag: K) {
  return class extends Type("tagged", { tag })<TaggedNative<K>> {
    constructor() {
      super({ tag })
    }
  }
}

export interface Matcher<V extends Variant> {
  when: <M extends V, Y, O>(
    match: M,
    f: (value: VariantValue<M>) => Generator<Y, O>,
  ) => MatcherStep<Exclude<V, M>, Y, O>
}
export interface MatcherStep<V extends Variant, P, O> {
  when: <M extends V, Y>(
    match: M,
    f: (value: VariantValue<M>) => Generator<Y, O>,
  ) => [Exclude<V, M>] extends [never] ? Effect<P | Y, O> : MatcherStep<Exclude<V, M>, P | Y, O>

  else: <Y>(f: (value: VariantValue<V>) => Generator<Y, O>) => Effect<P | Y, O>
}

export type TaggedNative<K extends keyof any> = { tag: K }

class Cat extends struct({
  a: u8,
}) {}

class MyUnion extends union("A", "B", "C", Cat) {}
MyUnion.from({ tag: "A" })

function* test() {
  const g = MyUnion.from(new Cat({ a: 1 }))
  yield* g.when(Cat, function*(value) {
    yield ""
  })
  const h = g
    .match()
    .when("A", function*() {
      yield "hello"
      return 1
    })
    .when("B", function*() {
      yield 2
      return 1
    })
    .when("C", function*() {
      return 1
    })
    .else(function*(cat) {
      return 1
    })
}
