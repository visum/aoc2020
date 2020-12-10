import {findContiguousNumbersThatEqualNumber,findInvalidEntries} from "./lib.ts";

const input = Deno.readTextFileSync("./input.txt").split("\n").map(i => parseInt(i, 10));

const invalidEntry = findInvalidEntries(25, input)[0];

console.log("Found invalid entry ", invalidEntry);

const resultNumbers = findContiguousNumbersThatEqualNumber(invalidEntry, input);

if(!resultNumbers){
  throw new Error("No matching numbers found");
}

console.log(resultNumbers.join("\n"));

const smallest = Math.min(...resultNumbers);
const largest = Math.max(...resultNumbers);

console.log(`Min: ${smallest}, max: ${largest}, sum: ${smallest + largest}`);
