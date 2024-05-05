import { Type } from "./Type.js"

export type Source<Tag extends string, Props> = {
  tag: Tag
  this: Type
} & Props

export function Source<Node extends { tag: string }>() {
  return function<
    Target extends Type,
    K extends Node["tag"],
    Member extends Node & { tag: K },
  >(
    this: Target,
    tag: K,
    props: Omit<Member, "tag" | "this">,
  ) {
    const next = this.clone()
    const node = { tag, ...props } as never as Node
    next[""].source = node
    return next
  }
}
