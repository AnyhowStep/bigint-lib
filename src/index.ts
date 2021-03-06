import {getBigIntLib} from "./get-bigint-lib";
import {getNativeOrJsbiPolyfillBigIntLib} from "./get-native-or-jsbi-polyfill-bigint-lib";
import {JSBI} from "./jsbi";

export * from "./bigint-lib";
export {getBigIntLib};
export {getNativeOrJsbiPolyfillBigIntLib};
export {JSBI};

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
export const bigIntLib = getBigIntLib();
/**
 * Synonym for `bigIntLib`.
 */
export const biLib = bigIntLib;

/**
 * If `global.BigInt` is natively supported, returns `nativeBigIntLib`.
 * Otherwise, returns `jsbiPolyfillBigIntLib`.
 *
 * This is useful for libraries that need to perform many complex
 * `BigInt` operations before returning a result.
 *
 * -----
 *
 * ### Usage
 *
 * ```ts
 *  import {bigIntLib, nativeOrJsbiLib} from "bigint-lib";
 *
 *  const my1 = nativeOrJsbiLib.BigInt(1);
 *
 *  //Takes native or JSBI polyfilled bigints
 *  //Will return a native or JSBI polyfilled bigint
 *  function myComplexFunctionImpl (m : bigint, n : bigint) : bigint {
 *      if (nativeOrJsbiLib.equal(m, 0)) {
 *          return nativeOrJsbiLib.add(n, my1);
 *      }
 *      if (nativeOrJsbiLib.equal(n, 0)) {
 *          return myComplexFunctionImpl(
 *              nativeOrJsbiLib.subtract(m, my1),
 *              my1
 *          );
 *      }
 *      return myComplexFunctionImpl(
 *          nativeOrJsbiLib.subtract(m, my1),
 *          myComplexFunctionImpl(m, nativeOrJsbiLib.subtract(n, 1))
 *      );
 *  }
 *
 *  //Takes native, JSBI polyfilled, or other polyfilled bigints
 *  //Must return a `bigint` that may be native, polyfilled with JSBI, or polyfilled with other libraries
 *  function myComplexFunction (m : bigint, n : bigint) : bigint {
 *      //Will be a native or JSBI polyfilled `bigint`
 *      const myM = nativeOrJsbiLib.BigInt(m.toString());
 *      const myN = nativeOrJsbiLib.BigInt(n.toString());
 *      const myResult = myComplexFunctionImpl(myM, myN);
 *
 *      //Convert the result to a `bigint` type the same as its input
 *      return bigIntLib.BigInt(myResult.toString());
 *  }
 * ```
 */
export const nativeOrJsbiLib = getNativeOrJsbiPolyfillBigIntLib();

export * from "./jsbi-polyfill";
export * from "./native";
export * from "./non-jsbi-polyfill";