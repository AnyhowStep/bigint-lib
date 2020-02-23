import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";

tape(__filename, t => {
    t.throws(
        () => {
            return OriginalBigInt(1).toString(37);
        },
        RangeError
    );
    t.throws(
        () => {
            bigIntLib.toString(bigIntLib.BigInt(1), 37 as any);
        },
        RangeError
    );

    t.end();
});