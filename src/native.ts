import {BigIntLib} from "./bigint-lib";

declare const BigInt : {
    (x : number|string|boolean|object) : bigint;
    asIntN (bitCount : number, b : bigint) : bigint;
    asUintN (bitCount : number, b : bigint) : bigint;
};

/**
 * Assumes `BigInt` is natively supported.
 */
export const nativeBigIntLib : BigIntLib = {
    isNativelySupported : () => true,
    isBigInt : (x) : x is bigint => typeof x === "bigint",

    BigInt : (x) => BigInt(x),
    toString : (x, radix) => (x as any).toString(radix),

    unaryMinus : (x) => -x,
    bitwiseNot : (x) => ~x,

    exponentiate : (x, y) => x ** y,
    multiply : (x, y) => x * y,
    divide : (x, y) => x / y,
    remainder : (x, y) => x % y,
    add : (x, y) => x + y,
    subtract : (x, y) => x - y,

    leftShift : (x, y) => x << y,
    signedRightShift : (x, y) => x >> y,

    lessThan : (x, y) => x < y,
    lessThanOrEqual : (x, y) => x <= y,
    greaterThan : (x, y) => x > y,
    greaterThanOrEqual : (x, y) => x >= y,
    equal : (x, y) => x == y,
    notEqual : (x, y) => x != y,

    bitwiseAnd : (x, y) => x & y,
    bitwiseXor : (x, y) => x ^ y,
    bitwiseOr : (x, y) => x | y,

    asIntN : (n, x) => BigInt.asIntN(n, x),
    asUintN : (n, x) => BigInt.asUintN(n, x),
};
