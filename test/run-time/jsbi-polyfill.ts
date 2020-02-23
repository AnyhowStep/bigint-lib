import {JSBI} from "../../dist/jsbi";
import {OriginalBigInt} from "./original-bigint";

(global as any).BigInt = JSBI.BigInt;

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
        (bigIntLib.BigInt(1) as any) instanceof JSBI,
        true
    );
    t.end();
});
