import { build, emptyDir } from "@deno/dnt"
import { parseArgs } from "@std/cli"

const { version } = parseArgs(Deno.args, {
  string: ["version"],
  default: { version: "v0.0.0-local" },
})

await emptyDir("target/npm")
await build({
  package: {
    name: "liminal",
    version,
    description: "",
    license: "Apache-2.0",
    repository: "github:MinaFoundation/Liminal",
  },
  compilerOptions: {
    importHelpers: true,
    sourceMap: true,
    target: "ES2022",
    lib: ["ES2022", "DOM"],
  },
  entryPoints: [
    { name: ".", path: "./mod.ts" },
    { name: "liminal/lib", path: "./lib/mod.ts" },
    { name: "liminal/std", path: "./std/mod.ts" },
    { name: "liminal/test", path: "./test/mod.ts" },
  ],
  outDir: "target/npm",
  shims: {
    deno: true,
  },
  test: false,
  scriptModule: false,
  async postBuild() {
    await Promise.all([
      Deno.copyFile("LICENSE", "target/npm/LICENSE"),
      Deno.copyFile("README.md", "target/npm/README.md"),
    ])
  },
})
