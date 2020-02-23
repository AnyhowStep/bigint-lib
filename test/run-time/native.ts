import * as tape from "tape";
import {bigIntLib} from "../../dist";

tape(__filename, t => {
    t.deepEqual(bigIntLib.isNativelySupported(), true);
    t.end();
});
