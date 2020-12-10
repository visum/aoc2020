import {assert, fail, assertEquals} from "https://deno.land/std/testing/asserts.ts";
import {numberIsSumOfNumbers, findInvalidEntries, findContiguousNumbersThatEqualNumber} from "./lib.ts";

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
  fn(): void {
    const last5 = testSetArray.slice(0,5);
    const num = testSetArray[5];
    console.log("result", numberIsSumOfNumbers(num, last5));
    assert(numberIsSumOfNumbers(num, last5), "valid");
    assert(!numberIsSumOfNumbers(127, testSetArray.slice(9,14)), "invalid");
  }
});

Deno.test({
  name:"findInvalidEntries",
  fn(): void {
    const invalidEntries = findInvalidEntries(5, testSetArray);
    console.log("Invalid entries:",invalidEntries);
    assert(invalidEntries[0] === 127);
    assert(invalidEntries.length === 1);
  }
});

Deno.test({
  name: "findContiguousNumbersThatEqualNumber",
  fn(): void {
    const numbers = findContiguousNumbersThatEqualNumber(127, testSetArray);
    assert(numbers);
    assert(numbers[0] === 15);
    assert(numbers[3] === 40);
    assert(numbers.length === 4);
  }
});