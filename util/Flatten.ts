// TODO: adjust for misc. native datatypes
export type Flatten<T> = T extends any[] ? T : T extends object ? { [K in keyof T]: T[K] } : T
