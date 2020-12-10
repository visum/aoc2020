import {findInvalidEntries} from "./lib.ts";
const input = Deno.readTextFileSync("./input.txt");
const numbers = input.split("\n").map(i => parseInt(i, 10));

const invalidEntries = findInvalidEntries(25, numbers);

console.log(`Invalid entries: ${invalidEntries.join(",")}`);
