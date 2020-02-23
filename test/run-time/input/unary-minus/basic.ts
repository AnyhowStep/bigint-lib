import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";
import {nums} from "../../nums";

tape(__filename, t => {
    for (const i of nums) {
        const native = -OriginalBigInt(i);
        const lib = bigIntLib.unaryMinus(bigIntLib.BigInt(i));
        t.deepEqual(
            lib.toString(),
            native.toString()
        );
    }

    t.end();
});