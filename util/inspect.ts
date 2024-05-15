export type Inspect = (value: unknown) => string

export abstract class Inspectable {
  private inspectCtx = new Map<unknown, number | null>()
  private inspectId = 0

  protected abstract inspect(_inspect: Inspect): string

  private [Symbol.for("Deno.customInspect")](
    inspect_: (value: unknown, opts: unknown) => string,
    opts: unknown,
  ) {
    return this.inspect_((x) => inspect_(x, opts))
  }

  private [Symbol.for("nodejs.util.inspect.custom")](_0: unknown, _1: unknown, inspect: Inspect) {
    return this.inspect_(inspect)
  }

  private inspect_(inspect: Inspect): string {
    let id = this.inspectCtx.get(this)
    if (id !== undefined) {
      if (id === null) {
        this.inspectCtx.set(this, id = this.inspectId++)
      }
      return `$${id}`
    }
    try {
      this.inspectCtx.set(this, null)
      const content = this.inspect(inspect)
      id = this.inspectCtx.get(this)
      return id !== null ? `$${id} = ${content}` : content
    } finally {
      this.inspectCtx.delete(this)
      if (this.inspectCtx.size === 0) this.inspectId = 0
    }
  }
}
