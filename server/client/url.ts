export namespace mina {
  export const url = detectUrl("mina")
}
export namespace archive {
  export const url = detectUrl("archive", true)
}

function detectUrl(liminalServerSubpath: string, archive?: true) {
  return (productionUrl?: string) => {
    const devUrl = process.env.LIMINAL_SERVER
    if (devUrl) return `${devUrl}/${liminalServerSubpath}`
    if (!productionUrl) {
      throw new Error(`No production URL supplied to \`${archive ? "archive" : "mina"}.url\` call.`)
    }
    return productionUrl
  }
}
