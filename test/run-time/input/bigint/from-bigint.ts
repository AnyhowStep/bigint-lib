import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";

tape(__filename, t => {
    for (let i=-100; i<=100; ++i) {
        const native = OriginalBigInt(OriginalBigInt(i));
        const polyfilled = BigInt(BigInt(i));
        const lib = bigIntLib.BigInt(bigIntLib.BigInt(i));
        t.deepEqual(
            polyfilled.toString(),
            native.toString()
        );
        t.deepEqual(
            lib.toString(),
            native.toString()
        );
    }

    t.end();
});