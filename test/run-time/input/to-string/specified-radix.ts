import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib, BigIntToStringRadix} from "../../../../dist";
import {nums} from "../../nums";

tape(__filename, t => {
    for (let radix=2; radix<=36; ++radix) {
        for (const i of nums) {
            const native = OriginalBigInt(i);
            const lib = bigIntLib.BigInt(i);
            t.deepEqual(
                bigIntLib.toString(lib, radix as BigIntToStringRadix),
                native.toString(radix)
            );
        }
    }

    t.end();
});