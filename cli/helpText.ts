import { blue, bold, dim, green, italic } from "@std/fmt/colors"

export const helpText = `
  ${bold("Description")}:

    ${
  bold(italic("Liminal"))
} is a tool for managing the lifecycle of Mina-interfacing apps and other JavaScript programs.


  ${bold("Options")}:

    ${blue("--exclude")} ${dim("or")} ${blue("-e")} ${dim("defaults to `[]`")}

      Exclude files and directories matching the specified glob(s).


    ${blue("--dev")} ${dim("defaults to `false`")}

      Start the Liminal server and build compile document changes.


    ${blue("--proofs")} ${dim("defaults to `false`")}

      Whether to enable proofs in the Liminal server's underlying devnet.


    ${blue("--tx-limits")} ${dim("defaults to `false`")}

      Whether to assert transaction limits in the Liminal server's underlying devnet.


    ${blue("--")} ${dim("defaults to `[]`")}

      Specify a command following the \`"--"\`. The Liminal server will run this command and ensure that devnet services are available for the duration of the run.


  ${blue(green("https://github.com/MinaFoundation/Liminal"))}

  ${bold("Liminal is Apache licensed.")}
`
