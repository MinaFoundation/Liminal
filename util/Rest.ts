export type Rest<T> = T extends undefined ? [value?: T] : [value: T]
