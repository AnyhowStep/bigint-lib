import {getAllTsFiles} from "./util";
import * as tape from "tape";

const start = new Date().getTime();
const paths = getAllTsFiles(__dirname + "/input", false);

for (let i=0; i<paths.length; ++i) {
    const path = paths[i]
        .replace(/\.ts$/, "")
        .replace(__dirname, ".");
    require(path);
    console.log(`${i+1}/${paths.length}`, path);
}

tape(__filename, async (t) => {
    const end = new Date().getTime();
    const timeTaken = end-start;
    console.log("Run-time tests completed in", timeTaken/1000.0, "s");
    t.end();
});
