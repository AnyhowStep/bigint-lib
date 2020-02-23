import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";
import {nums} from "../../nums";

tape(__filename, t => {
    for (const x of nums.slice(0, 300)) {
        for (const y of nums.slice(0, 300)) {
            if (y == 0) {
                continue;
            }
            const native = OriginalBigInt(x) % OriginalBigInt(y);
            const lib = bigIntLib.remainder(bigIntLib.BigInt(x), bigIntLib.BigInt(y));
            t.deepEqual(
                lib.toString(),
                native.toString()
            );
        }
    }

    t.end();
});