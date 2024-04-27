export type T = any
export namespace T {
  export declare const ref: any
  export declare const signer: any
  export namespace sk {
    export declare function random(...args: any): {
      pk: any
      sk: any
    }
  }
  export declare const u64: any
  export declare const string: any
  export declare const u8: any
  export declare const pk: any
  export declare const u8a: any
  export declare const none: any
  export declare const unit: any
  export declare const bool: any
  export declare function _<T, U>(...args: any): any
  export declare function env<T, U>(...args: any): any
  export declare function not<T>(...args: any): any
  export declare function pair<T>(...args: any): any
  export declare function target<T>(...args: any): any
  export declare function store<T>(...args: any): any
  export declare function vec<T>(...args: any): any
  export declare function spec<T>(...args: any): any
  export declare function method<T>(...args: any): any
  export declare function result<T>(...args: any): any
  export namespace pair {
    export declare function random<T>(...args: any): any
  }
  export declare function contract<T>(...args: any): any
  export declare function struct(...args: any): any
  export declare function union(...args: any): any // or enum
}
