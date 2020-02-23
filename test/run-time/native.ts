import * as tape from "tape";
import {bigIntLib, nativeOrJsbiLib, nativeBigIntLib} from "../../dist";

tape(__filename, t => {
    t.deepEqual(bigIntLib.isNativelySupported(), true);
    t.deepEqual(
        nativeOrJsbiLib,
        nativeBigIntLib
    );
    t.end();
});
