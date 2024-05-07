// TODO: constrain
export type Contract<N> = {
  [K in keyof N]: N[K]
}
