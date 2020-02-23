import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";

tape(__filename, t => {
    t.throws(
        () => {
            OriginalBigInt.asIntN(-1, OriginalBigInt(1));
        },
        RangeError
    );
    t.throws(
        () => {
            bigIntLib.asIntN(-1, bigIntLib.BigInt(1));
        },
        RangeError
    );

    t.end();
});