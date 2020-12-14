import {buildAdapterChain, countIntervalTypes} from "./lib.ts";

const input = Deno.readTextFileSync("./input.txt");
const adapterList = input.split("\n").map(i => parseInt(i, 10));

const adapterChain = buildAdapterChain(adapterList);

const intervals = countIntervalTypes(adapterChain);

const oneIntervals = intervals.get(1) ?? 0;
const threeIntervals = intervals.get(3) ?? 0;

console.log(`Found ${oneIntervals} 1 intervals and ${threeIntervals} 3 intervals`);
console.log(`The product of the two interval counts is ${oneIntervals * threeIntervals}`);

