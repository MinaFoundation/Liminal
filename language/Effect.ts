export interface Effect<T, E> extends Generator<E, T, unknown> {}

export type Catch<T> = { catch: T }
