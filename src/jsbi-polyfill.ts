import {BigIntLib} from "./bigint-lib";
import {JSBI} from "./jsbi";

declare const BigInt : {
    (x : number|string|boolean|object) : bigint;
};

/**
 * Assumes `BigInt` is polyfilled to be,
 * ```ts
 *  import JSBI from "jsbi";
 *  global.BigInt = JSBI.BigInt;
 * ```
 */
export const jsbiPolyfillBigIntLib : BigIntLib = {
    isNativelySupported : () => false,
    isBigInt : (x) : x is bigint => x instanceof JSBI,

    BigInt : (x) => BigInt(x),
    toString : (x, radix) => (x as unknown as JSBI).toString(radix),
    toNumber : (x) => JSBI.toNumber(x as unknown as JSBI),

    unaryMinus : (x) => JSBI.unaryMinus(
        x as unknown as JSBI
    ) as unknown as bigint,
    bitwiseNot : (x) => JSBI.bitwiseNot(
        x as unknown as JSBI
    ) as unknown as bigint,

    exponentiate : (x, y) => JSBI.exponentiate(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    multiply : (x, y) => JSBI.multiply(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    divide : (x, y) => JSBI.divide(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    remainder : (x, y) => JSBI.remainder(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    add : (x, y) => JSBI.add(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    subtract : (x, y) => JSBI.subtract(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,

    leftShift : (x, y) => JSBI.leftShift(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    signedRightShift : (x, y) => JSBI.signedRightShift(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,

    lessThan : (x, y) => JSBI.LT(
        typeof x == "number" ? x : x,
        typeof y == "number" ? y : y,
    ),
    lessThanOrEqual : (x, y) => JSBI.LE(
        typeof x == "number" ? x : x,
        typeof y == "number" ? y : y
    ),
    greaterThan : (x, y) => JSBI.GT(
        typeof x == "number" ? x : x,
        typeof y == "number" ? y : y
    ),
    greaterThanOrEqual : (x, y) => JSBI.GE(
        typeof x == "number" ? x : x,
        typeof y == "number" ? y : y
    ),
    equal : (x, y) => JSBI.EQ(
        typeof x == "number" ? x : x,
        typeof y == "number" ? y : y
    ),
    notEqual : (x, y) => JSBI.NE(
        typeof x == "number" ? x : x,
        typeof y == "number" ? y : y
    ),

    bitwiseAnd : (x, y) => JSBI.bitwiseAnd(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    bitwiseXor : (x, y) => JSBI.bitwiseXor(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,
    bitwiseOr : (x, y) => JSBI.bitwiseOr(
        x as unknown as JSBI,
        y as unknown as JSBI
    ) as unknown as bigint,

    asIntN : (n, x) => {
        if (n < 0) {
            //https://github.com/GoogleChromeLabs/jsbi/issues/39
            throw new RangeError(`Invalid value: not (convertible to) a safe integer`);
        }
        return JSBI.asIntN(
            n,
            x as unknown as JSBI
        ) as unknown as bigint;
    },
    asUintN : (n, x) => {
        if (n < 0) {
            //https://github.com/GoogleChromeLabs/jsbi/issues/39
            throw new RangeError(`Invalid value: not (convertible to) a safe integer`);
        }
        return JSBI.asUintN(
            n,
            x as unknown as JSBI
        ) as unknown as bigint;
    },
};
