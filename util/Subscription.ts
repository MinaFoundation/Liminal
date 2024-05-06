import { SignalOptions } from "./AbortController.js"

export interface Subscription<T> {
  subscribe(callback: (value: T) => void, options?: SignalOptions): void
}
