import {OriginalBigInt} from "./original-bigint";

class MyPolyfill {
    private __value : string;
    constructor (mixed : number|string|boolean|object) {
        if (typeof mixed == "boolean") {
            this.__value = mixed ? "1" : "0";
        } else {
            this.__value = mixed.toString();
        }
    }
    toString () {
        return this.__value;
    }
}
(global as any).BigInt = (value : string|number|object) => {
    return new MyPolyfill(value);
};

(BigInt as any).prototype = {};
(BigInt as any).prototype.valueOf = function () {
    return this;
};

import * as tape from "tape";
import {bigIntLib} from "../../dist";

tape(__filename, t => {
    t.deepEqual(bigIntLib.isNativelySupported(), false);
    t.deepEqual(
        BigInt === OriginalBigInt,
        false
    );
    t.deepEqual(
        (bigIntLib.BigInt(1) as any) instanceof MyPolyfill,
        true
    );
    t.end();
});
