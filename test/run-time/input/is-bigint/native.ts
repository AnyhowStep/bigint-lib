import * as tape from "tape";
import {bigIntLib} from "../../../../dist";

tape(__filename, t => {
    if (!bigIntLib.isNativelySupported()) {
        t.end();
        return;
    }

    const arr = [
        true,
        false,
        0,
        -1,
        1,
        BigInt(0),
        BigInt(-1),
        BigInt(1),
        "0",
        "-1",
        "1",
        new Date(0),
        new Date(-1),
        new Date(1),
        Buffer.from([0]),
        Buffer.from([1]),
        new Uint8Array([0]),
        new Uint8Array([1]),
        Symbol("0"),
        Symbol("-1"),
        Symbol("1"),
        null,
        undefined,
    ];
    for (const i of arr) {
        t.deepEqual(
            bigIntLib.isBigInt(i),
            typeof i === "bigint"
        );
    }

    t.end();
});