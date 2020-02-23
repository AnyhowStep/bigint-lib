import {BigIntLib} from "./bigint-lib";
import {JSBI} from "./jsbi";
import {nativeBigIntLib} from "./native";
import {jsbiPolyfillBigIntLib} from "./jsbi-polyfill";
import {getNonJsbiPolyfillBigIntLib} from "./non-jsbi-polyfill";

declare const BigInt : {
    (x : number|string|object) : bigint;
};

/**
 * Assumes `global.BigInt` is natively supported,
 * or polyfilled.
 *
 * -----
 *
 * If `BigInt` is natively supported,
 * the most efficient `BigIntLib` instance is returned.
 *
 * Each method will just be an alias for the native operators and functions.
 *
 * -----
 *
 * If `BigInt` is polyfilled to be,
 * ```ts
 *  import JSBI from "jsbi";
 *  global.BigInt = JSBI.BigInt;
 * ```
 *
 * An efficient `BigIntLib` instance is returned.
 * It will take JSBI instances as arguments,
 * and return JSBI instances.
 *
 * -----
 *
 * If `BigInt` is, minimally, polyfilled to be,
 * ```ts
 *  class MyPolyfill {
 *      constructor (mixed) {
 *          //snip https://tc39.es/ecma262/#sec-bigint-constructor
 *      }
 *
 *      toString () {
 *          return //snip base-10 string
 *      }
 *  }
 *  global.BigInt = (mixed) => new MyPolyfill(mixed);
 * ```
 *
 * A less efficient `BigIntLib` instance is returned.
 * It will internally use [`jsbi`](https://github.com/GoogleChromeLabs/jsbi) to
 * implement all the necessary `bigint` operations.
 *
 */
export function getBigIntLib () : BigIntLib {
    const bigint = BigInt(0);
    if (typeof bigint === "bigint") {
        return nativeBigIntLib;
    }
    const constructor = Object.getPrototypeOf(bigint).constructor;

    if (constructor === JSBI) {
        return jsbiPolyfillBigIntLib;
    } else {
        return getNonJsbiPolyfillBigIntLib(constructor);
    }
}