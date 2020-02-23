import * as tape from "tape";
import {OriginalBigInt} from "../../original-bigint";
import {bigIntLib} from "../../../../dist";
import {nums} from "../../nums";

tape(__filename, t => {
    for (const x of nums.slice(0, 300)) {
        for (const y of nums.slice(0, 300)) {
            const arr = [
                [true, true],
                [true, false],
                [false, true],
                [false, false]
            ] as const;
            for (const [xNum, yNum] of arr) {
                type Predicate = (x : number|bigint, y : number|bigint) => boolean;
                const predicates : [Predicate, Predicate][] = [
                    [bigIntLib.lessThan, (x, y) => x < y],
                    [bigIntLib.lessThanOrEqual, (x, y) => x <= y],
                    [bigIntLib.greaterThan, (x, y) => x > y],
                    [bigIntLib.greaterThanOrEqual, (x, y) => x >= y],
                    [bigIntLib.equal, (x, y) => x == y],
                    [bigIntLib.notEqual, (x, y) => x != y],
                ];
                for (const [actualPredicate, expectedPredicate] of predicates) {
                    t.deepEqual(
                        actualPredicate(
                            xNum ? x : bigIntLib.BigInt(x),
                            yNum ? y : bigIntLib.BigInt(y)
                        ),
                        expectedPredicate(
                            (xNum ? x : OriginalBigInt(x)),
                            (yNum ? y : OriginalBigInt(y))
                        )
                    );
                }
            }
        }
    }

    t.end();
});