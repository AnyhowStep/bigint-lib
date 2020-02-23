import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";
import {nums, nonNegNums} from "../../nums";

tape(__filename, t => {
    for (const n of nonNegNums.slice(0, 300)) {
        for (const x of nums.slice(0, 300)) {
            const native = OriginalBigInt.asIntN(n, OriginalBigInt(x));
            const lib = bigIntLib.asIntN(n, bigIntLib.BigInt(x));
            t.deepEqual(
                lib.toString(),
                native.toString()
            );
        }
    }

    t.end();
});