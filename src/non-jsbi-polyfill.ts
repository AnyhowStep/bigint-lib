import {BigIntLib} from "./bigint-lib";
import {JSBI} from "./jsbi";

/**
 * Assumes `BigInt` is, minimally, polyfilled to be,
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
 * -----
 *
 * Internally, uses [`jsbi`](https://github.com/GoogleChromeLabs/jsbi) to
 * implement all the necessary `bigint` operations.
 *
 * @param BigInt - The `bigint` polyfill class constructor
 */
export function getNonJsbiPolyfillBigIntLib (BigInt : { new (x : number|string|boolean|object) : bigint }) : BigIntLib {
    return {
        isNativelySupported : () => false,
        isBigInt : (x) : x is bigint => x instanceof BigInt,

        BigInt : (x) => new BigInt(x),
        toString : (x, radix) => JSBI.BigInt(x.toString()).toString(radix),
        toNumber : (x) => JSBI.toNumber(
            JSBI.BigInt(x.toString())
        ),

        unaryMinus : (x) => new BigInt(
            JSBI.unaryMinus(
                JSBI.BigInt(x.toString())
            ).toString()
        ),
        bitwiseNot : (x) => new BigInt(
            JSBI.bitwiseNot(
                JSBI.BigInt(x.toString())
            ).toString()
        ),

        exponentiate : (x, y) => new BigInt(
            JSBI.exponentiate(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        multiply : (x, y) => new BigInt(
            JSBI.multiply(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        divide : (x, y) => new BigInt(
            JSBI.divide(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        remainder : (x, y) => new BigInt(
            JSBI.remainder(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        add : (x, y) => new BigInt(
            JSBI.add(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        subtract : (x, y) => new BigInt(
            JSBI.subtract(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),

        leftShift : (x, y) => new BigInt(
            JSBI.leftShift(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        signedRightShift : (x, y) => new BigInt(
            JSBI.signedRightShift(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),

        lessThan : (x, y) => JSBI.LT(
            typeof x == "number" ? x : JSBI.BigInt(x.toString()),
            typeof y == "number" ? y : JSBI.BigInt(y.toString()),
        ),
        lessThanOrEqual : (x, y) => JSBI.LE(
            typeof x == "number" ? x : JSBI.BigInt(x.toString()),
            typeof y == "number" ? y : JSBI.BigInt(y.toString()),
        ),
        greaterThan : (x, y) => JSBI.GT(
            typeof x == "number" ? x : JSBI.BigInt(x.toString()),
            typeof y == "number" ? y : JSBI.BigInt(y.toString()),
        ),
        greaterThanOrEqual : (x, y) => JSBI.GE(
            typeof x == "number" ? x : JSBI.BigInt(x.toString()),
            typeof y == "number" ? y : JSBI.BigInt(y.toString()),
        ),
        equal : (x, y) => JSBI.EQ(
            typeof x == "number" ? x : JSBI.BigInt(x.toString()),
            typeof y == "number" ? y : JSBI.BigInt(y.toString()),
        ),
        notEqual : (x, y) => JSBI.NE(
            typeof x == "number" ? x : JSBI.BigInt(x.toString()),
            typeof y == "number" ? y : JSBI.BigInt(y.toString()),
        ),

        bitwiseAnd : (x, y) => new BigInt(
            JSBI.bitwiseAnd(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        bitwiseXor : (x, y) => new BigInt(
            JSBI.bitwiseXor(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),
        bitwiseOr : (x, y) => new BigInt(
            JSBI.bitwiseOr(
                JSBI.BigInt(x.toString()),
                JSBI.BigInt(y.toString())
            ).toString()
        ),

        asIntN : (n, x) => {
            if (n < 0) {
                //https://github.com/GoogleChromeLabs/jsbi/issues/39
                throw new RangeError(`Invalid value: not (convertible to) a safe integer`);
            }
            return new BigInt(
                JSBI.asIntN(
                    n,
                    JSBI.BigInt(x.toString())
                ).toString()
            );
        },
        asUintN : (n, x) => {
            if (n < 0) {
                //https://github.com/GoogleChromeLabs/jsbi/issues/39
                throw new RangeError(`Invalid value: not (convertible to) a safe integer`);
            }
            return new BigInt(
                JSBI.asUintN(
                    n,
                    JSBI.BigInt(x.toString())
                ).toString()
            );
        },
    };
}
