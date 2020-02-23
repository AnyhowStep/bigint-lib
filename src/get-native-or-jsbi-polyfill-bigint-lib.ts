import {BigIntLib} from "./bigint-lib";
import {nativeBigIntLib} from "./native";
import {jsbiPolyfillBigIntLib} from "./jsbi-polyfill";

declare const BigInt : {
    (x : number|string|object) : bigint;
};

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
export function getNativeOrJsbiPolyfillBigIntLib () : BigIntLib {
    const bigint = BigInt(0);
    if (typeof bigint === "bigint") {
        return nativeBigIntLib;
    }
    return jsbiPolyfillBigIntLib;
}