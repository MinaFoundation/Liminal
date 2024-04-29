export abstract class Store implements Disposable {
  abstract get(key: string): Promise<Uint8Array | undefined>
  abstract set(key: string, value: Uint8Array): Promise<void>
  abstract sub(key: string): Store
  abstract [Symbol.dispose](): void
}
