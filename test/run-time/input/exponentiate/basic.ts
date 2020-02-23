import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";
import {nums, nonNegNums} from "../../nums";

tape(__filename, t => {
    for (const x of nums) {
        for (const y of nonNegNums.slice(0, 10)) {
            const native = OriginalBigInt(x) ** OriginalBigInt(y);
            const lib = bigIntLib.exponentiate(bigIntLib.BigInt(x), bigIntLib.BigInt(y));
            t.deepEqual(
                lib.toString(),
                native.toString()
            );
        }
    }

    t.end();
});