import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
import {numberIsSumOfNumbers} from "./lib.ts";

const testSet = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

const testSetArray = testSet.split("\n").map(i => parseInt(i, 10));

Deno.test({
  name:"numberIsSumOfNumbers",
  fn: () => {
    const last5 = testSetArray.slice(0,5);
    const num = testSetArray[5];
    console.log("result", numberIsSumOfNumbers(num, last5));
    assert(numberIsSumOfNumbers(num, last5), "valid");
    assert(!numberIsSumOfNumbers(127, testSetArray.slice(9,14)), "invalid");
  }
});