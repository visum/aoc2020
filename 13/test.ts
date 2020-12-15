import { assert } from "https://deno.land/std@0.80.0/testing/asserts.ts";
import {getNextDepartureAfter, getNextRoute, parseSchedule} from "./lib.ts";

Deno.test({
  name: "part one",
  fn(): void {
    const testData = `939
    7,13,x,x,59,x,31,19`;

    const {startTime, routes} = parseSchedule(testData);

    const bestRoute = getNextRoute(routes, startTime);
    console.log("best route", bestRoute);

    assert(bestRoute === 59, "Best route is 59");
    const waitTime = getNextDepartureAfter(bestRoute, startTime) - startTime;
    assert(waitTime * bestRoute === 295, "wait time * best route === 295");
  }
});