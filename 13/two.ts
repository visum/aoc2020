import {findPartTwoSolution} from "./lib.ts";

const schedule = Deno.readTextFileSync("./input.txt");

const routes = schedule.split("\n")[1];

const answer = findPartTwoSolution(routes, 100000000000000);

console.log(`I found an answer: ${answer}`);

