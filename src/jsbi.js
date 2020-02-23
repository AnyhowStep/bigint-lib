/**
 * Hack for importing JSBI without enabling `esModuleInterop`
 */
const jsbi = require("jsbi");
exports.JSBI = jsbi;