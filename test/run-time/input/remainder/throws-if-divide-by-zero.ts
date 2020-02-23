import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";

tape(__filename, t => {
    t.throws(
        () => {
            return OriginalBigInt(1) % OriginalBigInt(0);
        },
        RangeError
    );
    t.throws(
        () => {
            bigIntLib.remainder(bigIntLib.BigInt(1), bigIntLib.BigInt(0));
        },
        RangeError
    );

    t.end();
});