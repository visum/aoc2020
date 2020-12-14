import { assert } from "https://deno.land/std/testing/asserts.ts";
import { buildAdapterChain, countIntervalTypes } from "./lib.ts";

const testInput1 = `16
10
15
5
1
11
7
19
6
12
4`;

const testAdapters1 = testInput1.split("\n").map(i => parseInt(i, 10));

Deno.test({
  name: "countIntervalTypes",
  fn(): void {
    const adapterChain = buildAdapterChain(testAdapters1);
    const intervals = countIntervalTypes(adapterChain);
    assert(intervals.get(1) === 7);
    assert(intervals.get(3) === 5);
  }
})

const testInput2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const testAdapter2 = testInput2.split("\n").map(i => parseInt(i, 10));

Deno.test({
  name: "countIntervalTypes 2",
  fn(): void {
    const adapterChain = buildAdapterChain(testAdapter2);
    const intervals = countIntervalTypes(adapterChain);
    assert(intervals.get(1) === 22);
    assert(intervals.get(3) === 10);
  }
});
