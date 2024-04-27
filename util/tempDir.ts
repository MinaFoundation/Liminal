import * as fs from "node:fs/promises"
import * as path from "node:path"

export async function tempDir(parentDir: string, name: string) {
  const dir = path.join(parentDir, name, timeKey())
  await fs.mkdir(dir, { recursive: true })
  return dir
}

function timeKey() {
  return new Date().toISOString().replace(/[:T.]/g, "-").slice(0, -1)
}
