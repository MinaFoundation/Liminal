import { bold, cyan } from "@std/fmt/colors"
import { STATUS_CODE } from "@std/http"
import { emptyDir } from "fs-extra"
import { spawn } from "node:child_process"
import * as fs from "node:fs/promises"
import { createServer } from "node:http"
import * as path from "node:path"
import { inspect } from "node:util"
import open from "open"
import { helpText } from "./cli/helpText.js"
import { parseArgs } from "./cli/parseArgs.js"
import { Context } from "./server/Context.js"
import { createHandler } from "./server/handler.js"
import { Logger } from "./util/Logger.js"

const args = parseArgs(process.argv)
const { help, cmd, port, issue, lib } = args

if (help) {
  console.log("\n")
  console.log(helpText)
} else if (issue) {
  await open("https://github.com/MinaFoundation/Liminal/issues")
} else {
  const logger = new Logger()

  if (port) {
    const controller = new AbortController()
    const { signal } = controller

    const href = `http://localhost:${port}/`
    const context = new Context(args, logger, controller)

    const handle = await createHandler(context)

    const server = createServer(async (request) => {
      try {
        return await handle(request)
      } catch (e: unknown) {
        if (e instanceof Response) return e.clone()
        logger.error(inspect(e))
        return new Response(inspect(e), {
          status: STATUS_CODE.InternalServerError,
        })
      }
    })

    server.listen({ port, signal, host: "::" }, () => {
      logger.info("serve", bold(cyan(href)))
      logger.info("serve", cyan(`${href}archive`))
      const [bin, ...args] = cmd
      if (bin) {
        const child = spawn(bin, args, {
          stdio: "inherit",
          env: { LIMINAL_SERVER: href },
          signal,
        })
        child.on("close", () => {
          if (!port) controller.abort()
        })
      }
    })
  }
}
