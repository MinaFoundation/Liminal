import { SignalOptions } from "./AbortController.ts"

export interface Paginated<K, V> {
  page(options: PageOptions<K>): AsyncIterable<V>
}

interface PageOptions<K> extends SignalOptions {
  limit: number
  after?: K
  ordered?: boolean
}
