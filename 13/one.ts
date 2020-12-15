import { getNextDepartureAfter, getNextRoute, parseSchedule } from "./lib.ts";

const schedule = Deno.readTextFileSync("./input.txt");

const { startTime, routes } = parseSchedule(schedule);

const nextRoute = getNextRoute(routes, startTime);

const nextDeparture = getNextDepartureAfter(nextRoute, startTime)

const waitTime = nextDeparture - startTime;

console.log(`You will arrive at ${startTime}.
The next bus leaving is id ${nextRoute}.
Its next departure will be at ${nextDeparture}.
You will wait ${waitTime} minutes.
The puzzle answer is ${waitTime * nextRoute}`);
