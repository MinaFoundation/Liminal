// TODO: adjust for misc. native datatypes
export type Flatten<T> = [{ [K in keyof T]: T[K] }][0]
