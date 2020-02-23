export type BigIntToStringRadix =
    |2|3|4|5|6|7|8|9
    |10|11|12|13|14|15|16|17|18|19
    |20|21|22|23|24|25|26|27|28|29
    |31|31|32|33|34|35|36
;
export interface BigIntLib {
    /**
     * @returns `true` if `BigInt` is natively supported; `false` otherwise.
     */
    isNativelySupported () : boolean;

    /**
     * Is this value a `bigint`?
     *
     * + If BigInt is natively supported, this does `typeof x === "bigint"`
     * + Is BigInt is polyfilled, this does `x instanceof Object.getPrototypeOf(BigInt(0)).constructor`
     *
     * @param x - The value to check
     */
    isBigInt (x : unknown) : x is bigint;

    /**
     * Creates a `bigint` value.
     *
     * Internally does `BigInt(x)`
     *
     * @param x - The value to cast to `bigint`
     */
    BigInt (x : string|number|boolean|object) : bigint;

    /**
     * Converts a `bigint` value to `string`
     *
     * @param x - The `bigint` to convert to `string`
     * @param radix - Defaults to `10`; must be in [2, 36]
     */
    toString (x : bigint, radix? : BigIntToStringRadix) : string;

    /**
     * Converts a `bigint` value to `number`
     *
     * @param x - The `bigint` to convert to `number`
     */
    toNumber (x : bigint) : number;

    /**
     *
     * @param x - The `bigint` value
     * @returns `-x`
     */
    unaryMinus (x : bigint) : bigint;

    /**
     *
     * @param x - The `bigint` value
     * @returns `~x`
     */
    bitwiseNot (x : bigint) : bigint;

    /**
     *
     * @param x
     * @param y - Must be non-negative; throws if negative
     * @returns `x ** y`
     */
    exponentiate (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y
     * @returns `x * y`
     */
    multiply (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y - Must be non-zero; throws if zero
     * @returns `x / y`
     */
    divide (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y - Must be non-zero; throws if zero
     * @returns `x % y`
     */
    remainder (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y
     * @returns `x + y`
     */
    add (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y
     * @returns `x - y`
     */
    subtract (x : bigint, y : bigint) : bigint;

    /**
     * Performs a bitwise left-shift.
     *
     * Allows negative shifts; unlike `number`.
     *
     * @param x
     * @param y
     * @returns `x << y`
     */
    leftShift (x : bigint, y : bigint) : bigint;

    /**
     * Performs a bitwise signed right-shift.
     *
     * Allows negative shifts; unlike `number`.
     *
     * @param x
     * @param y
     * @returns `x >> y`
     */
    signedRightShift (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y
     * @returns `x < y`
     */
    lessThan (x : bigint|number, y : bigint|number) : boolean;

    /**
     *
     * @param x
     * @param y
     * @returns `x <= y`
     */
    lessThanOrEqual (x : bigint|number, y : bigint|number) : boolean;

    /**
     *
     * @param x
     * @param y
     * @returns `x > y`
     */
    greaterThan (x : bigint|number, y : bigint|number) : boolean;

    /**
     *
     * @param x
     * @param y
     * @returns `x >= y`
     */
    greaterThanOrEqual (x : bigint|number, y : bigint|number) : boolean;

    /**
     *
     * @param x
     * @param y
     * @returns `x == y`
     */
    equal (x : bigint|number, y : bigint|number) : boolean;

    /**
     *
     * @param x
     * @param y
     * @returns `x != y`
     */
    notEqual (x : bigint|number, y : bigint|number) : boolean;

    /**
     *
     * @param x
     * @param y
     * @returns `x & y`
     */
    bitwiseAnd (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y
     * @returns `x ^ y`
     */
    bitwiseXor (x : bigint, y : bigint) : bigint;

    /**
     *
     * @param x
     * @param y
     * @returns `x | y`
     */
    bitwiseOr (x : bigint, y : bigint) : bigint;

    /**
     * The `BigInt.asIntN` static method is used to wrap a BigInt value to a signed integer between
     * `-2^(width-1)` and `2^(width-1)-1`.
     *
     * @param width - The amount of bits available for the integer size. Must be non-negative; throws if negative
     * @param bigint - The integer to clamp to fit into the supplied bits.
     * @returns The value of `bigint` modulo `2^width` as a signed integer.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asIntN}
     */
    asIntN (width : number, bigint : bigint) : bigint;

    /**
     * The `BigInt.asUintN` static method is used to wrap a BigInt value to an unsigned integer between
     * `0` and `2^(width)-1`.
     *
     * @param width - The amount of bits available for the integer size. Must be non-negative; throws if negative
     * @param bigint - The integer to clamp to fit into the supplied bits.
     * @returns The value of `bigint` modulo `2^width` as an unsigned integer.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asUintN}
     */
    asUintN (width : number, bigint : bigint) : bigint;
}