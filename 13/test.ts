import { assert } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import {getNextDepartureAfter, getNextRoute, parseSchedule, findPartTwoSolution} from "./lib.ts";

Deno.test({
  name: "part one",
  fn(): void {
    const testData = `939
7,13,x,x,59,x,31,19`;

    const {startTime, routes} = parseSchedule(testData);

    const bestRoute = getNextRoute(routes, startTime);

    assert(bestRoute === 59, "Best route is 59");
    const waitTime = getNextDepartureAfter(bestRoute, startTime) - startTime;
    assert(waitTime * bestRoute === 295, "wait time * best route === 295");
  }
});

Deno.test({
  name: "part two",
  fn(): void {
    const input = "7,13,x,x,59,x,31,19";
    const answer = findPartTwoSolution(input, 100053464053427);
    assert(answer === 1068781, "first set");

    const answer2 = findPartTwoSolution("17,x,13,19");
    assert(answer2 === 3417, "second set");

    const answer3 = findPartTwoSolution("67,7,59,61");
    assert(answer3 === 754018, "third set");

    const answer4 = findPartTwoSolution("1789,37,47,1889");
    assert(answer4 === 1202161486, "fourth set");
  }
})