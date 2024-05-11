export type Rest<T> = undefined extends T ? [value?: T] : [value: T]
