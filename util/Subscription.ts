import { SignalOptions } from "./AbortController.ts"

export interface Subscription<T> {
  subscribe(callback: (value: T) => void, options?: SignalOptions): Promise<void>
}
