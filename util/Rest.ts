export type Rest<T> = T extends undefined ? [] : undefined extends T ? [value?: T] : [value: T]
