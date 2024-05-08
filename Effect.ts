import { SignerRequirement } from "./id.js"
import { Matcher } from "./Matcher.js"
import { Constructor, Type } from "./Type.js"

export type Yield = Type | SignerRequirement
export type Result = Type | void

export class Effect<Y extends Yield, R extends Result> implements Generator<Y, R> {
  "" = {} as { node: unknown }

  next(): IteratorResult<Y, R> {
    throw 0
  }

  return(): IteratorResult<Y, R> {
    throw 0
  }

  throw(): IteratorResult<Y, R> {
    throw 0
  }

  [Symbol.iterator](): Generator<Y, R> {
    throw 0
  }

  handle(): Handle<Y, R> {
    throw 0
  }

  rehandle<Match extends Constructor<Y>>(
    match: Match,
  ): [Exclude<Y, InstanceType<Match>>] extends [never] ? InstanceType<Match> | R
    : Effect<Exclude<Y, InstanceType<Match>>, R>
  {
    throw 0
  }
}

export class Handle<Y extends Yield, R extends Type | void> {
  constructor(private call: Generator<Y, R>) {}

  // when<Target extends Constructor<Y>, Yield extends Type>(
  //   match: Target,
  //   f: (value: InstanceType<Target>) => Generator<Yield, R>,
  // ): Matcher<Exclude<Y, InstanceType<Target>>, Yield, R> {
  //   return new Matcher(this.call, f, match)
  // }
}
