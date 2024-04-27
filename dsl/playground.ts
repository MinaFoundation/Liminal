type Pipe = <T, U>(this: T, f: (x: T) => U) => U

class Node<T, X> {
  _: [T, X]
  pipe: Pipe
  map: <U>(x: (x: T) => U) => Node<U, X>
}

type NodeGenerator<Y, R, N, X> = Generator<
  Node<Y, X>,
  Node<R, X>,
  Node<N, never>
>

type Push<T, X> = T | X

type Result<T, E> = { type: "ok"; value: T } | { type: "err"; err: E }

type Try<E> = { __try: E }
type Dep<K extends keyof any, T> = { __dep: [K, T] }

type Handle = <T, E, X>(x: Node<Result<T, E>, X>) => Node<T, Push<Try<E>, X>>

declare function instructions<T, E, X>(
  f: (handle: Handle) => Node<T, Push<Try<E>, X>>,
): Node<Result<T, E>, X>
declare function instructions<Y, R, N, E, X>(
  f: (handle: Handle) => NodeGenerator<Y, R, N, Push<Try<E>, X>>,
): NodeGenerator<Result<Y, E>, Result<R, E>, N, X>

declare function dep<K extends keyof any>(key: K): <T>() => <X>() => Node<T, Push<Dep<K, T>, X>>

declare function supply<K extends keyof any, T, U, X>(
  key: K,
  x: () => Node<T, Push<Dep<K, U>, X>>,
  value: U,
): Node<T, X>

type Foo = "foo"
type Bar = "bar"
type Baz = "baz"

class FooError {
  readonly foo = "foo"
}

declare function makeBaz<X>(
  x: Node<Foo, X>,
  y: Node<Bar, X>,
  // z: Node<string, X>,
): Node<Baz, X>

function x<X>() {
  function getFoo(): Node<Result<Foo, FooError>, X | Dep<"fooDep", number>> {
    throw 0
  }
  function getBar(): Node<Bar, X> {
    throw 0
  }

  const bar = instructions((ctx) => {
    const foo = getFoo().pipe(ctx)
    // Mina<Result<"foo", FooError>, X>
    //  to:
    // Mina<"foo", Push<Try<FooError>, X>>
    const bar = getBar()
    // const z = dep("something")<string>
    const baz = makeBaz(foo, bar)
    return baz
  })

  // TODO: or reference `this` instead of `$`?
  const gen = instructions(function*($) {
    const foo = getFoo().pipe($)
    yield foo
    const bar = getBar()
    const baz = makeBaz(foo, bar)
    return baz
  })
  gen

  // NodeGenerator<Result<"foo", FooError>, Result<"baz", FooError>, unknown, X | Dep<"fooDep", number>>

  const done = supply("fooDep", () => bar, 123)
}

declare function add<X>(a: Node<number, X>, b: Node<number, X>): Node<number, X>

declare const a: Node<1, Dep<"HELLO", string>>
declare const b: Node<1, never>
const y = add(a, b)
