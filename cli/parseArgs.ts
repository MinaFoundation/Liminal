import { parseArgs as parseArgs_ } from "@std/cli/parse-args"
import assert from "node:assert"
import { createServer } from "node:http"
import { inspect } from "node:util"

export interface ParsedArgs {
  cmd: string[]
  port?: number
  help: boolean
  issue: boolean
  lib: string
}

export function parseArgs(args: string[]): ParsedArgs {
  const lib = new URL("../target", import.meta.url).pathname
  const { "--": cmd, dev, help, issue } = parseArgs_(args, {
    "--": true,
    collect: ["exclude"],
    string: ["dev"],
    boolean: ["help", "issue"],
    alias: { h: "help" },
  })

  let port: number | undefined
  if (typeof dev === "string") {
    if (dev) {
      try {
        port = parseInt(dev)
      } catch {
        console.error(
          `Invalid port ${
            inspect(dev)
          } specified via \`--dev\`. Expected either an open port or no argument.`,
        )
      }
    } else {
      const server = createServer(() => {})
      const address = server.listen(0).address()
      if (typeof address === "string") {
        const portRaw = new URL(address).port
        assert(portRaw)
        port = parseInt(portRaw)
      } else if (address) {
        ;({ port } = address)
      } else {throw new Error(
          `Could not determine an open port. Please manually specify via the \`--dev\` argument.`,
        )}
      server.close()
    }
  }

  return { cmd, port, help, issue, lib }
}
