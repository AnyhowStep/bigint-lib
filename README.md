[![Build Status](https://travis-ci.com/AnyhowStep/bigint-lib.svg?branch=master)](https://travis-ci.com/AnyhowStep/bigint-lib) [![codecov](https://codecov.io/gh/AnyhowStep/bigint-lib/branch/master/graph/badge.svg)](https://codecov.io/gh/AnyhowStep/bigint-lib) [![HitCount](http://hits.dwyl.io/AnyhowStep/bigint-lib.svg)](http://hits.dwyl.io/AnyhowStep/bigint-lib) ![dependencies](https://david-dm.org/AnyhowStep/bigint-lib.svg)

### `bigint-lib`

Use BigInt in **library** code, whether native or polyfilled.

-----

### Installation

```
npm install --save bigint-lib
```

-----

### Usage

If polyfilling, polyfill `BigInt` **first**.

Then,
```ts
import {bigIntLib} from "bigint-lib";

/**
 * `true` if natively supported; `false` otherwise
 */
bigIntLib.isNativelySupported();

/**
 * `true` if considered a `BigInt`
 */
bigIntLib.isBigInt(x);

/**
 * Creates a `BigInt` instance
 */
bigIntLib.BigInt(0);
```

See [API](#api) for more details

Since this library is meant for library authors, reading the [source code](src) to understand how it works internally is recommended.

-----

### Motivation

Not all browsers support `BigInt` natively.

https://caniuse.com/#feat=mdn-javascript_builtins_bigint

-----

**Application** code can use polyfills for `BigInt` easily.

https://github.com/GoogleChromeLabs/jsbi

-----

However, **libraries** cannot assume that `BigInt` is natively supported, or polyfilled.

A library has to check.

If it is natively supported, we can use `BigInt` and all built-in operations directly.

If it is **polyfilled**, we cannot assume the shape of the exposed API for built-in operations.

Is addition done with `x.add(y)`? Or `Polyfill.add(x, y)`? Or `x.plus(y)`? Is it even implemented at all?

What about every other operation?

-----

This library provides a [unified API](src/bigint-lib.ts) for all built-in `BigInt` operations,
regardless of whether `BigInt` is natively supported, or polyfilled.

-----

### How it works

This library's only dependency is [`jsbi`](https://github.com/GoogleChromeLabs/jsbi).

We have [three cases](src/get-bigint-lib.ts) to handle,

+ `BigInt` is natively supported

  We use the built-in operations directly.

  This is the most efficient.

  See [src/native.ts](src/native.ts) for more details.

+ `BigInt` is polyfilled using `jsbi`

  We use `jsbi` for built-in operations.

  This is still pretty efficient.

  See [src/jsbi-polyfill.ts](src/jsbi-polyfill.ts) for more details.

+ `BigInt` is polyfilled using some other library

  We convert the other library's `BigInt` to `JSBI`,
  use `jsbi` for built-in operations,
  and convert the result back to the other libary's `BigInt`.

  This is the least efficient, but saves us from having to worry about the exposed API of the other library.

  See [src/non-jsbi-polyfill.ts](src/non-jsbi-polyfill.ts) for more details.

-----

### Expected Polyfill

This library assumes polyfills conform to some minimal API.

-----

#### Polyfill with JSBI

To polyfill using `jsbi`,
```ts
import JSBI from "jsbi";
global.BigInt = JSBI.BigInt;
```

-----

At the moment, using `jsbi`+TypeScript with `esModuleInterop:false` may cause the import to fail during run-time.

You may set `esModuleInterop:true` to fix the problem.
However, setting `esModuleInterop:true` may cause other imports to fail.

You may choose to keep `esModuleInterop:false` and change the import to,
```ts
import {JSBI} from "bigint-lib/dist/jsbi";
global.BigInt = JSBI.BigInt;
```

-----

#### Polyfill with Other Library

If polyfilling with some other library, the library must, minimally, have the following API,
```ts
class MyPolyfill {
    constructor (mixed : any) {
        //snip https://tc39.es/ecma262/#sec-bigint-constructor
    }

    toString () {
        return //snip base-10 string
    }
}
global.BigInt = (mixed : any) => new MyPolyfill(mixed);
```

The polyfill must also satisfy the following properties,
```ts
BigInt(0) instanceof MyPolyfill
> true
Object.getPrototypeOf(BigInt(0)).constructor === MyPolyfill
> true
```

-----

### API

The following are exported by this library,

+ [`BigIntLib`](src/bigint-lib.ts) is the unified API, for native and polyfilled `BigInt` operations.
+ [`getBigIntLib()`](src/get-bigint-lib.ts) returns an instanceof `BigIntLib`, depending on whether `BigInt` is native or polyfilled. See [How it works](#how-it-works) for more details.
+ `JSBI` is a re-export of [`jsbi`](https://github.com/GoogleChromeLabs/jsbi)
+ `bigIntLib` is of type [`BigIntLib`](src/bigint-lib.ts) and is initialized with [`getBigIntLib()`](src/get-bigint-lib.ts) when `bigint-lib` is first imported.
+ `biLib` is a synonym for `bigIntLib`; in case `bigIntLib` is too verbose

-----

### `BigIntLib`

The interface is mostly the same as [`jsbi`](https://github.com/GoogleChromeLabs/jsbi#how)'s

| Operation | native `BigInt` | `bigint-lib` | Note
|---|---|---|---|
|Creation from String | `a = BigInt("456")` | `a = biLib.BigInt("456")`
|Creation from Number | `a = BigInt(789)` | `a = biLib.BigInt(789)`
|Creation from BigInt | `a = BigInt(a)` | `a = biLib.BigInt(a)`
|Conversion to String | `a.toString(radix)` | `biLib.toString(a, radix)` | `radix` defaults to `10`; must be in [2, 36]
|Conversion to Number | `Number(a)` | `biLib.toNumber(a)` | May result in precision loss
|Truncation | `BigInt.asIntN(width, a)` | `biLib.asIntN(width, a)` | Throws if `width` is negative
|           | `BigInt.asUintN(width, a)` | `biLib.asUintN(width, a)` | Throws if `width` is negative
|Type check | `typeof a === "bigint"` | `biLib.isBigInt(a)`
|Native `BigInt` check | `typeof BigInt(0) === "bigint"` | `biLib.isNativelySupported()`

-----

| Operation | native `BigInt` | `bigint-lib` | Note
|---|---|---|---|
|Arithmetic | |
|Unary minus | `b = -a` | `b = biLib.unaryMinus(a)`
|Addition | `c = a + b` | `c = biLib.add(a, b)`
|Subtraction | `c = a - b` | `c = biLib.subtract(a, b)`
|Multiplication | `c = a * b` | `c = biLib.multiply(a, b)`
|Division | `c = a / b` | `c = biLib.divide(a, b)` | Throws if `b` is zero
|Remainder | `c = a % b` | `c = biLib.remainder(a, b)` | Throws if `b` is zero
|Exponentiation | `c = a ** b` | `c = biLib.exponentiate(a, b)` | Throws if `b` is negative
|Bitwise | |
|Left-shift | `c = a << b` | `c = biLib.leftShift(a, b)` | Allows negative shift
|Signed right-shift | `c = a >> b` | `c = biLib.signedRightShift(a, b)` | Allows negative shift
|Bitwise NOT | `b = ~a` | `c = biLib.bitwiseNot(a)`
|Bitwise AND | `c = a & b` | `c = biLib.bitwiseAnd(a, b)`
|Bitwise OR | `c = a \| b` | `c = biLib.bitwiseOr(a, b)`
|Bitwise XOR | `c = a ^ b` | `c = biLib.bitwiseXor(a, b)`
|Comparison | `a == b` | `biLib.equal(a, b)`
|           | `a != b` | `biLib.notEqual(a, b)`
|           | `a < b` | `biLib.lessThan(a, b)`
|           | `a <= b` | `biLib.lessThanOrEqual(a, b)`
|           | `a > b` | `biLib.greaterThan(a, b)`
|           | `a >= b` | `biLib.greaterThanOrEqual(a, b)`
|Unsupported | |
|Literals | `a = 123n` | N/A
|Increment | `a++`/`++a` | N/A
|          | `a + 1n`    | `biLib.add(a, biLib.BigInt(1))`
|Decrement | `a--`/`--a` | N/A
|          | `a - 1n`    | `biLib.subtract(a, biLib.BigInt(1))`

-----

### Polyfilling with `node`

1. Have your polyfill code in a `.js` file.
1. `node -r my-polyfill.js my-entry-point.js`

-----

### Polyfilling with `ts-node`

1. Have your polyfill code in a `.ts` file.
1. `ts-node -r my-polyfill.ts my-entry-point.ts`

-----

### Development

1. `git clone https://github.com/AnyhowStep/bigint-lib.git`
1. `npm install`
1. `npm run sanity-check` to build and run tests.
1. `npm run` to see a list of commands.